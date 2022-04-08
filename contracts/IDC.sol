pragma solidity ^0.8.10;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract IDC is ERC20("IDC", "IDC") {
    using ECDSA for bytes32;

    mapping(bytes32 => bool) public executed;
    address owner;
    constructor() payable {
        owner = msg.sender;
    }
    function mint(address receiver, uint256 amount) public {
        _mint(receiver, amount);
    }

    function transfer(
        address _from,
        address _to,
        uint256 _amount,
        uint256 _nonce,
        bytes[2] memory _sigs
    ) public virtual {
        bytes32 txHash = getTxHash(_from,_to, _amount, _nonce);
        require(!executed[txHash], "tx executed");
        require(_checkSigs(_from,_sigs, txHash), "invalid sig");

        executed[txHash] = true;
        _transfer(_from,_to,_amount);
    }

    function getTxHash(
        address _from,
        address _to,
        uint256 _amount,
        uint256 _nonce
    ) public view returns (bytes32) {
        return keccak256(abi.encodePacked(address(this), _from, _to, _amount, _nonce));
    }

    function _checkSigs(address _from,bytes[2] memory _sigs, bytes32 _txHash)
        private
        view
        returns (bool)
    {
        bytes32 ethSignedHash = _txHash.toEthSignedMessageHash();
            address signer1 = ethSignedHash.recover(_sigs[0]);
            bool valid1 = signer1 == _from;
            address signer2 = ethSignedHash.recover(_sigs[1]);
            bool valid2 = signer2 == owner;
            if(valid1==true && valid2==true) {
                return true;
            }
        return false;
    }
}
