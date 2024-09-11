import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalContent,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Snippet,
  useDisclosure,
} from "@nextui-org/react"
import EnterInputModal from "components/common/EnterInputModal"
import Logo from "components/common/Logo"
import {
  useReadMainContractGetApr,
  useReadMainContractGetDeployer,
  useWriteMainContractSetApr,
} from "configs/generated"
import { wagmiConfig } from "configs/wagmi"
import { chainIcons } from "constants/chainIcons"
import useTransactionToast from "hooks/useTransactionToast"
import FaucetModal from "modules/home/components/FaucetModal"
import { EthAddress, Hash } from "modules/home/pages/HomePage"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useChain } from "store/chain"
import { shortenAddress } from "utils/shortenAddress"
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi"
import { waitForTransactionReceipt } from "wagmi/actions"
import { MainContract } from "../../../contracts/MainContract-address.json"

export default function Header() {
  const { address, chainId, isConnecting } = useAccount()
  const { disconnect } = useDisconnect()
  const { connectors, connect, isPending } = useConnect()
  const { chains, switchChain } = useSwitchChain()
  const { chain, setChain } = useChain()

  const disclosureFaucet = useDisclosure()
  const disclosureSetAPR = useDisclosure()

  const { transactionToast } = useTransactionToast()

  const navigate = useNavigate()

  const { refetch: getAprRefetch } = useReadMainContractGetApr({
    address: MainContract as EthAddress,
  })

  const { data: deployer } = useReadMainContractGetDeployer({
    address: MainContract as EthAddress,
  })

  const { writeContractAsync: setAprMainContract, isPending: isPendingSetApr } =
    useWriteMainContractSetApr()

  const handleWithdrawERC20 = async (apr: number) => {
    if (address) {
      await setAprMainContract({
        address: MainContract as EthAddress,
        args: [apr],
      }).then(async (hash: Hash) => {
        await waitForTransactionReceipt(wagmiConfig, {
          hash,
          timeout: 60 * 60 * 1000,
          retryCount: 6,
        }).then(() => {
          Promise.all([getAprRefetch()])
        })
      })
    }
  }

  useEffect(() => {
    switchChain({
      chainId: chain.id,
    })
  }, [chain.id, chainId])

  return (
    <>
      <div className="fixed z-40 w-full">
        <Navbar
          isBordered
          className="px-6"
          classNames={{
            base: "py-1",
            wrapper: "max-w-default px-0",
          }}
        >
          <NavbarContent justify="start" className="!flex-grow-0 gap-0">
            <NavbarBrand as={Link} to={"/"} className="cursor-pointer">
              <Logo />
              <p className="pl-3 font-bold text-inherit">DeFi App</p>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent
            className="hidden flex-1 gap-4 sm:flex"
            justify="center"
          ></NavbarContent>
          <NavbarContent justify="end" className="!flex-grow-0">
            <Dropdown
              classNames={{
                content: "min-w-44 max-w-52",
              }}
            >
              <DropdownTrigger>
                <Button
                  color="secondary"
                  variant="bordered"
                  radius="full"
                  size="lg"
                  startContent={
                    <Icon
                      icon={chainIcons[chain.id as keyof typeof chainIcons]}
                      className="text-2xl"
                    />
                  }
                  className="overflow-hidden text-ellipsis whitespace-nowrap px-5 text-black"
                >
                  {chain.name}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                {chains.map((chain) => (
                  <DropdownItem
                    key={chain.id}
                    onClick={() =>
                      setChain({
                        id: chain.id,
                        name: chain.name,
                      })
                    }
                    startContent={
                      <Icon
                        icon={chainIcons[chain.id as keyof typeof chainIcons]}
                        className="text-4xl"
                      />
                    }
                  >
                    {chain.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {address ? (
              <Dropdown
                classNames={{
                  content: "min-w-44",
                }}
              >
                <DropdownTrigger>
                  <Button
                    as="div"
                    color="secondary"
                    variant="bordered"
                    radius="full"
                    size="lg"
                    startContent={
                      <Icon
                        icon="material-symbols:wallet"
                        className="text-2xl"
                      />
                    }
                    className="overflow-hidden text-ellipsis whitespace-nowrap px-5 text-black"
                  >
                    <Snippet
                      onCopy={() => {
                        navigator.clipboard.writeText(address)
                      }}
                      size="lg"
                      hideSymbol
                      className="bg-transparent p-0"
                      classNames={{
                        pre: "font-public-sans",
                      }}
                    >
                      {shortenAddress(address)}
                    </Snippet>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem
                    color="secondary"
                    key="faucet"
                    onClick={disclosureFaucet.onOpen}
                    endContent={<Icon icon="tabler:coin" className="text-xl" />}
                  >
                    Faucet
                  </DropdownItem>
                  <DropdownItem
                    color="secondary"
                    key="transaction-history"
                    onClick={() => navigate("/transaction-history")}
                    endContent={<Icon icon="mdi:history" className="text-xl" />}
                  >
                    Transaction History
                  </DropdownItem>
                  {deployer === address ? (
                    <DropdownItem
                      color="secondary"
                      key="set-apr"
                      endContent={
                        <Icon icon="uil:setting" className="text-xl" />
                      }
                      onPress={disclosureSetAPR.onOpen}
                    >
                      Set APR
                    </DropdownItem>
                  ) : (
                    <DropdownItem hidden className="p-0"></DropdownItem>
                  )}
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    onClick={() => disconnect()}
                    endContent={
                      <Icon
                        icon="material-symbols:logout"
                        className="text-xl"
                      />
                    }
                  >
                    Disconnect
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              connectors.map(
                (connector, idx) =>
                  connector.icon &&
                  connector.name === "MetaMask" && (
                    <NavbarItem key={idx}>
                      <Button
                        size="lg"
                        radius="full"
                        isLoading={isPending || isConnecting}
                        key={connector.uid}
                        onClick={() => {
                          connect({ connector, chainId: chain.id })
                        }}
                        className="font-semibold"
                        color="secondary"
                      >
                        Connect Wallet
                      </Button>
                    </NavbarItem>
                  ),
              )
            )}
          </NavbarContent>
        </Navbar>
      </div>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="lg"
        isOpen={disclosureFaucet.isOpen}
        onClose={disclosureFaucet.onClose}
        className="bg-blue-50 p-4 text-default-900"
        classNames={{
          closeButton: "bg-transparent",
        }}
      >
        <ModalContent>
          {(onClose) => <FaucetModal onClose={onClose} />}
        </ModalContent>
      </Modal>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="md"
        isOpen={disclosureSetAPR.isOpen}
        onClose={disclosureSetAPR.onClose}
        className="p-4 text-default-900"
        classNames={{
          closeButton: "bg-transparent",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <EnterInputModal
              callback={(value) => {
                transactionToast({
                  callbackAsync: handleWithdrawERC20(value),
                  successCallback: onClose,
                  loading: "Setting APR...",
                  success: "Set APR successfully",
                  error: "Set APR failed",
                })
              }}
              innerHeader="Set APR"
              placeholder="Enter APR"
              isLoading={isPendingSetApr}
              onClose={onClose}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
