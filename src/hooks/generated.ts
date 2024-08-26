import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MainContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mainContractAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'tokenErc20', internalType: 'address', type: 'address' },
      { name: 'tokenErc721', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'from',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'NFTReceived',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'function',
    inputs: [],
    name: 'claimReward',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'NFTId', internalType: 'uint256', type: 'uint256' }],
    name: 'depositNFT',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'depositOf',
    outputs: [
      {
        name: '',
        internalType: 'struct MainContract.Deposit',
        type: 'tuple',
        components: [
          { name: 'APRIncrement', internalType: 'uint8', type: 'uint8' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'accumulatedInterest',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'depositTime', internalType: 'uint256', type: 'uint256' },
          {
            name: 'lastInterestTime',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'depositOfNFT',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'depositToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAPR',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'getEventInfo',
    outputs: [
      {
        name: '',
        internalType: 'struct MainContract.EventInfo',
        type: 'tuple',
        components: [
          {
            name: 'depositToken',
            internalType: 'struct MainContract.DepositTokenInfo',
            type: 'tuple',
            components: [
              { name: 'user', internalType: 'address', type: 'address' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'depositNFT',
            internalType: 'struct MainContract.DepositNFTInfo',
            type: 'tuple',
            components: [
              { name: 'user', internalType: 'address', type: 'address' },
              { name: 'NFTId', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'withdrawERC20',
            internalType: 'struct MainContract.WithdrawERC20Info',
            type: 'tuple',
            components: [
              { name: 'user', internalType: 'address', type: 'address' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'withdrawNFT',
            internalType: 'struct MainContract.WithdrawNFTInfo',
            type: 'tuple',
            components: [
              { name: 'user', internalType: 'address', type: 'address' },
              { name: 'NFTId', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'claimReward',
            internalType: 'struct MainContract.ClaimRewardInfo',
            type: 'tuple',
            components: [
              { name: 'user', internalType: 'address', type: 'address' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'transferERC20',
            internalType: 'struct MainContract.TransferERC20Info',
            type: 'tuple',
            components: [
              { name: 'from', internalType: 'address', type: 'address' },
              { name: 'to', internalType: 'address', type: 'address' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'transferNFT',
            internalType: 'struct MainContract.TransferNFTInfo',
            type: 'tuple',
            components: [
              { name: 'from', internalType: 'address', type: 'address' },
              { name: 'to', internalType: 'address', type: 'address' },
              { name: 'NFTId', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'successful', internalType: 'bool', type: 'bool' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'APR', internalType: 'uint8', type: 'uint8' }],
    name: 'setAPR',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferERC20',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'NFTId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferNFT',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'updateInterest',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'withdrawNFT',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TokenERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const tokenErc20Abi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TokenERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const tokenErc721Abi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'getBalanceNFT',
    outputs: [
      {
        name: '',
        internalType: 'struct TokenERC721.NFTInfo',
        type: 'tuple',
        components: [
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'symbol', internalType: 'string', type: 'string' },
          { name: 'balance', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mainContractAbi}__
 */
export const useReadMainContract = /*#__PURE__*/ createUseReadContract({
  abi: mainContractAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"depositOf"`
 */
export const useReadMainContractDepositOf = /*#__PURE__*/ createUseReadContract(
  { abi: mainContractAbi, functionName: 'depositOf' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"depositOfNFT"`
 */
export const useReadMainContractDepositOfNft =
  /*#__PURE__*/ createUseReadContract({
    abi: mainContractAbi,
    functionName: 'depositOfNFT',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"getAPR"`
 */
export const useReadMainContractGetApr = /*#__PURE__*/ createUseReadContract({
  abi: mainContractAbi,
  functionName: 'getAPR',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"getEventInfo"`
 */
export const useReadMainContractGetEventInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: mainContractAbi,
    functionName: 'getEventInfo',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"owner"`
 */
export const useReadMainContractOwner = /*#__PURE__*/ createUseReadContract({
  abi: mainContractAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mainContractAbi}__
 */
export const useWriteMainContract = /*#__PURE__*/ createUseWriteContract({
  abi: mainContractAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"claimReward"`
 */
export const useWriteMainContractClaimReward =
  /*#__PURE__*/ createUseWriteContract({
    abi: mainContractAbi,
    functionName: 'claimReward',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"depositNFT"`
 */
export const useWriteMainContractDepositNft =
  /*#__PURE__*/ createUseWriteContract({
    abi: mainContractAbi,
    functionName: 'depositNFT',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"depositToken"`
 */
export const useWriteMainContractDepositToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: mainContractAbi,
    functionName: 'depositToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const useWriteMainContractOnErc721Received =
  /*#__PURE__*/ createUseWriteContract({
    abi: mainContractAbi,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteMainContractRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: mainContractAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"setAPR"`
 */
export const useWriteMainContractSetApr = /*#__PURE__*/ createUseWriteContract({
  abi: mainContractAbi,
  functionName: 'setAPR',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"transferERC20"`
 */
export const useWriteMainContractTransferErc20 =
  /*#__PURE__*/ createUseWriteContract({
    abi: mainContractAbi,
    functionName: 'transferERC20',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"transferNFT"`
 */
export const useWriteMainContractTransferNft =
  /*#__PURE__*/ createUseWriteContract({
    abi: mainContractAbi,
    functionName: 'transferNFT',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteMainContractTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: mainContractAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"updateInterest"`
 */
export const useWriteMainContractUpdateInterest =
  /*#__PURE__*/ createUseWriteContract({
    abi: mainContractAbi,
    functionName: 'updateInterest',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteMainContractWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: mainContractAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"withdrawNFT"`
 */
export const useWriteMainContractWithdrawNft =
  /*#__PURE__*/ createUseWriteContract({
    abi: mainContractAbi,
    functionName: 'withdrawNFT',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mainContractAbi}__
 */
export const useSimulateMainContract = /*#__PURE__*/ createUseSimulateContract({
  abi: mainContractAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"claimReward"`
 */
export const useSimulateMainContractClaimReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mainContractAbi,
    functionName: 'claimReward',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"depositNFT"`
 */
export const useSimulateMainContractDepositNft =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mainContractAbi,
    functionName: 'depositNFT',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"depositToken"`
 */
export const useSimulateMainContractDepositToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mainContractAbi,
    functionName: 'depositToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const useSimulateMainContractOnErc721Received =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mainContractAbi,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateMainContractRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mainContractAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"setAPR"`
 */
export const useSimulateMainContractSetApr =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mainContractAbi,
    functionName: 'setAPR',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"transferERC20"`
 */
export const useSimulateMainContractTransferErc20 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mainContractAbi,
    functionName: 'transferERC20',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"transferNFT"`
 */
export const useSimulateMainContractTransferNft =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mainContractAbi,
    functionName: 'transferNFT',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateMainContractTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mainContractAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"updateInterest"`
 */
export const useSimulateMainContractUpdateInterest =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mainContractAbi,
    functionName: 'updateInterest',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateMainContractWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mainContractAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mainContractAbi}__ and `functionName` set to `"withdrawNFT"`
 */
export const useSimulateMainContractWithdrawNft =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mainContractAbi,
    functionName: 'withdrawNFT',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mainContractAbi}__
 */
export const useWatchMainContractEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: mainContractAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mainContractAbi}__ and `eventName` set to `"NFTReceived"`
 */
export const useWatchMainContractNftReceivedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mainContractAbi,
    eventName: 'NFTReceived',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mainContractAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchMainContractOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mainContractAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenErc20Abi}__
 */
export const useReadTokenErc20 = /*#__PURE__*/ createUseReadContract({
  abi: tokenErc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenErc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadTokenErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: tokenErc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenErc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadTokenErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: tokenErc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenErc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadTokenErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: tokenErc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenErc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadTokenErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: tokenErc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenErc20Abi}__ and `functionName` set to `"owner"`
 */
export const useReadTokenErc20Owner = /*#__PURE__*/ createUseReadContract({
  abi: tokenErc20Abi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenErc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadTokenErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: tokenErc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenErc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadTokenErc20TotalSupply = /*#__PURE__*/ createUseReadContract(
  { abi: tokenErc20Abi, functionName: 'totalSupply' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenErc20Abi}__
 */
export const useWriteTokenErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: tokenErc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenErc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteTokenErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: tokenErc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenErc20Abi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const useWriteTokenErc20DecreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenErc20Abi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenErc20Abi}__ and `functionName` set to `"increaseAllowance"`
 */
export const useWriteTokenErc20IncreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenErc20Abi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenErc20Abi}__ and `functionName` set to `"mint"`
 */
export const useWriteTokenErc20Mint = /*#__PURE__*/ createUseWriteContract({
  abi: tokenErc20Abi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenErc20Abi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteTokenErc20RenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenErc20Abi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenErc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteTokenErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: tokenErc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenErc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteTokenErc20TransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenErc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenErc20Abi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteTokenErc20TransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenErc20Abi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenErc20Abi}__
 */
export const useSimulateTokenErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: tokenErc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenErc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateTokenErc20Approve =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenErc20Abi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenErc20Abi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const useSimulateTokenErc20DecreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenErc20Abi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenErc20Abi}__ and `functionName` set to `"increaseAllowance"`
 */
export const useSimulateTokenErc20IncreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenErc20Abi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenErc20Abi}__ and `functionName` set to `"mint"`
 */
export const useSimulateTokenErc20Mint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenErc20Abi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenErc20Abi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateTokenErc20RenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenErc20Abi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenErc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateTokenErc20Transfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenErc20Abi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenErc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateTokenErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenErc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenErc20Abi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateTokenErc20TransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenErc20Abi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenErc20Abi}__
 */
export const useWatchTokenErc20Event =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: tokenErc20Abi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenErc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchTokenErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenErc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenErc20Abi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchTokenErc20OwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenErc20Abi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenErc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchTokenErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenErc20Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenErc721Abi}__
 */
export const useReadTokenErc721 = /*#__PURE__*/ createUseReadContract({
  abi: tokenErc721Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenErc721Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadTokenErc721BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: tokenErc721Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenErc721Abi}__ and `functionName` set to `"getApproved"`
 */
export const useReadTokenErc721GetApproved =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenErc721Abi,
    functionName: 'getApproved',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenErc721Abi}__ and `functionName` set to `"getBalanceNFT"`
 */
export const useReadTokenErc721GetBalanceNft =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenErc721Abi,
    functionName: 'getBalanceNFT',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenErc721Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadTokenErc721IsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenErc721Abi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenErc721Abi}__ and `functionName` set to `"name"`
 */
export const useReadTokenErc721Name = /*#__PURE__*/ createUseReadContract({
  abi: tokenErc721Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenErc721Abi}__ and `functionName` set to `"owner"`
 */
export const useReadTokenErc721Owner = /*#__PURE__*/ createUseReadContract({
  abi: tokenErc721Abi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenErc721Abi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadTokenErc721OwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: tokenErc721Abi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenErc721Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadTokenErc721SupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenErc721Abi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenErc721Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadTokenErc721Symbol = /*#__PURE__*/ createUseReadContract({
  abi: tokenErc721Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenErc721Abi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadTokenErc721TokenUri = /*#__PURE__*/ createUseReadContract({
  abi: tokenErc721Abi,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenErc721Abi}__
 */
export const useWriteTokenErc721 = /*#__PURE__*/ createUseWriteContract({
  abi: tokenErc721Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenErc721Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteTokenErc721Approve = /*#__PURE__*/ createUseWriteContract({
  abi: tokenErc721Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenErc721Abi}__ and `functionName` set to `"mint"`
 */
export const useWriteTokenErc721Mint = /*#__PURE__*/ createUseWriteContract({
  abi: tokenErc721Abi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenErc721Abi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteTokenErc721RenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenErc721Abi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenErc721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteTokenErc721SafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenErc721Abi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenErc721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteTokenErc721SetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenErc721Abi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenErc721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteTokenErc721TransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenErc721Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenErc721Abi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteTokenErc721TransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenErc721Abi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenErc721Abi}__
 */
export const useSimulateTokenErc721 = /*#__PURE__*/ createUseSimulateContract({
  abi: tokenErc721Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenErc721Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateTokenErc721Approve =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenErc721Abi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenErc721Abi}__ and `functionName` set to `"mint"`
 */
export const useSimulateTokenErc721Mint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenErc721Abi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenErc721Abi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateTokenErc721RenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenErc721Abi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenErc721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateTokenErc721SafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenErc721Abi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenErc721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateTokenErc721SetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenErc721Abi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenErc721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateTokenErc721TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenErc721Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenErc721Abi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateTokenErc721TransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenErc721Abi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenErc721Abi}__
 */
export const useWatchTokenErc721Event =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: tokenErc721Abi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenErc721Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchTokenErc721ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenErc721Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenErc721Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchTokenErc721ApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenErc721Abi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenErc721Abi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchTokenErc721OwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenErc721Abi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenErc721Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchTokenErc721TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenErc721Abi,
    eventName: 'Transfer',
  })
