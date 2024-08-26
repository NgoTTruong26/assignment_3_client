import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Snippet,
} from "@nextui-org/react"
import Logo from "components/common/Logo"
import { chainIcons } from "constants/chainIcons"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useChain } from "store/chain"
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi"

export default function Header() {
  const { address, chainId, isConnecting } = useAccount()
  const { disconnect } = useDisconnect()
  const { connectors, connect, isPending } = useConnect()
  const { chains, switchChain } = useSwitchChain()
  const { chain, setChain } = useChain()

  function shortenAddress(address: string, startLength = 4, endLength = 4) {
    return `${address.slice(0, startLength)}...${address.slice(-endLength)}`
  }

  useEffect(() => {
    switchChain({
      chainId: chain.id,
    })
  }, [chain.id])

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
                    >
                      {shortenAddress(address)}
                    </Snippet>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
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
    </>
  )
}
