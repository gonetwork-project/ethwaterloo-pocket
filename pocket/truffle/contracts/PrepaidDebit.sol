pragma solidity ^0.4.11;
/**
 * @title PrepaidDebit
 * Author Amit Shah
 * Simple debit card with rewards to incentivise spending habits
 */
contract PrepaidDebit{

   //Emergency circuit Breakers
  bool private stopped = false;


  //prepaid card user
  address spender;

  //unixtime (and all the caveats of ethereum timestamp) of next reward claim

  uint256 public total_balance;
  //the balance between funding
  uint256 public prev_total_balance;
  uint256 public total_reward;
  uint256 public reward_timestamp;

  uint8 public constant decimals = 18;

  mapping(address=>uint256) public pendingWithdrawal;

  event RewardClaimed(address _spender, address _owner, uint256 timestamp);
  event AccountFunded(address _spender, address _sender, uint256 amount);
  event Spent(address _spender, address _merchant, uint256 amount);
  event AccountDebited(address _spender, address _merchant, uint256 amount);

  //modifiers
  modifier stopInEmergency { if (!stopped) _; }
  modifier onlyInEmergency { if (stopped) _; }
  address public owner;


  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  function Ownable() {
    owner = msg.sender;
  }


  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }


  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  function transferOwnership(address newOwner) onlyOwner public {
    require(newOwner != address(0));
    OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }

  function toggleContractActive() onlyOwner public
    {
        // You can add an additional modifier that restricts stopping a contract to be based on another action, such as a vote of users
        stopped = !stopped;
    }

  //
  /**
   * @dev Constructor that gives msg.sender all of existing tokens.
   */
  function PrepaidDebit() payable public {
    owner = msg.sender;
    total_balance = msg.value;
  }

  function SetSpender(address newSpender) onlyOwner public {
      require(newSpender != address(0x0));
      spender = newSpender;
  }

  function Fund()  payable stopInEmergency public {
    require(msg.value > 0);
    //require((_amount + _reward) > msg.value);
    prev_total_balance = total_balance;
    total_balance= total_balance + msg.value;
    //total_reward = total_reward + _reward;

    AccountFunded(spender, msg.sender, msg.value);
  }

  //anyone can call ClaimReward, it  just moves balance figures around
  //for the allowed user
  function ClaimReward() public{

    require(rewardCondition());
    uint256 _reward = total_reward;
    total_reward = 0;
    total_balance = total_balance + _reward;

    //set new reward time
    reward_timestamp = now + 10 * 1 days;
    RewardClaimed(spender,owner,now);
  }

  function rewardCondition() returns (bool success){
      //if you saved 50% of your money
      //yes we now of the timestamp warnings, this is merely block.timestamp
      //and somewhat influenced by miners...
      require(now >= reward_timestamp);
      require((total_balance -prev_total_balance) >
        ((prev_total_balance * 50) / 100));
      return true;
  }

  function GetContractBalance() public constant returns(uint256 balance){
      return this.balance;
  }

  function Spend(address _merchant,uint256 _amount) stopInEmergency public{
    require(msg.sender == spender);
    require(_amount < total_balance);
    require(_amount < this.balance);//if there is a mismatch here theres already a problem
    total_balance = total_balance - _amount;
    pendingWithdrawal[_merchant] = pendingWithdrawal[_merchant]+ _amount;
    Spent(spender, _merchant, _amount);
  }

  function Withdraw() payable stopInEmergency public returns(bool success){
    //we in fact owe this person something
    require(pendingWithdrawal[msg.sender] > 0);
    //oh no if we got here!! Maybe because gas ran out to run this :()
    require(this.balance > pendingWithdrawal[msg.sender]);
    uint256 transfer_amount = pendingWithdrawal[msg.sender];
    pendingWithdrawal[msg.sender] = 0;
    //safe send to sender
    //msg.sender.transfer(1);
    msg.sender.transfer(transfer_amount);
    AccountDebited(spender,msg.sender, transfer_amount);
    return true;
  }

  //Kill this contract and send to owner
  function destroy() onlyOwner public {
    selfdestruct(owner);
  }

  function destroyAndSend(address _recipient) onlyOwner public {
    selfdestruct(_recipient);
  }






}
