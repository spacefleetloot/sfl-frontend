import React, { lazy } from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { ResetCSS } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import useEagerConnect from './hooks/useEagerConnect'
import useUserAgent from './hooks/useUserAgent'
import useScrollOnRouteChange from './hooks/useScrollOnRouteChange'
import { usePollBlockNumber } from './state/block/hooks'
import { usePollCoreFarmData } from './state/farms/hooks'
import { useFetchProfile } from './state/profile/hooks'
import { DatePickerPortal } from './components/DatePicker'
import { nftsBaseUrl } from './views/Nft/market/constants'
import GlobalStyle from './style/Global'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import { ToastListener } from './contexts/ToastsContext'
import PageLoader from './components/Loader/PageLoader'
import EasterEgg from './components/EasterEgg'
import GlobalCheckClaimStatus from './components/GlobalCheckClaimStatus'
import history from './routerHistory'
// Views included in the main bundle
import Pools from './views/Pools'
import Swap from './views/Swap'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity,
} from './views/AddLiquidity/redirects'
import RedirectOldRemoveLiquidityPathStructure from './views/RemoveLiquidity/redirects'
import { RedirectPathToSwapOnly, RedirectToSwap } from './views/Swap/redirects'
import { useInactiveListener } from './hooks/useInactiveListener'

import Sidebar from './components/Layout/Sidebar'
import config from './components/Menu/config/config'

import './style/sass/overrides.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style/css/animate.min.css'
import './style/css/dashboard.css'
import './style/css/demo.css'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
// const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const FarmAuction = lazy(() => import('./views/FarmAuction'))
const Lottery = lazy(() => import('./views/Lottery'))
const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
const Teams = lazy(() => import('./views/Teams'))
const Team = lazy(() => import('./views/Teams/Team'))
const TradingCompetition = lazy(() => import('./views/TradingCompetition'))
const Predictions = lazy(() => import('./views/Predictions'))
const PredictionsLeaderboard = lazy(() => import('./views/Predictions/Leaderboard'))
const Voting = lazy(() => import('./views/Voting'))
const Proposal = lazy(() => import('./views/Voting/Proposal'))
const CreateProposal = lazy(() => import('./views/Voting/CreateProposal'))
const AddLiquidity = lazy(() => import('./views/AddLiquidity'))
const Liquidity = lazy(() => import('./views/Pool'))
const PoolFinder = lazy(() => import('./views/PoolFinder'))
const RemoveLiquidity = lazy(() => import('./views/RemoveLiquidity'))
const Info = lazy(() => import('./views/Info'))
const NftMarket = lazy(() => import('./views/Nft/market'))
const ProfileCreation = lazy(() => import('./views/ProfileCreation'))
const PancakeSquad = lazy(() => import('./views/PancakeSquad'))

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const { account } = useWeb3React()

  usePollBlockNumber()
  useEagerConnect()
  useFetchProfile()
  usePollCoreFarmData()
  useScrollOnRouteChange()
  useUserAgent()
  useInactiveListener()

  const mainPanel = React.useRef(null);

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <GlobalCheckClaimStatus excludeLocations={[]} />
      <div className="wrapper">
        <Sidebar routes={config} color="light" image="" />
        <div className="main-panel" ref={mainPanel}>
          <SuspenseWithChunkError fallback={<PageLoader />}>
            <Switch>
              {/* <Route path="/" exact>
                <Home />
              </Route> */}
              <Route exact path="/farms/auction">
                <FarmAuction />
              </Route>
              <Route path="/farms">
                <Farms />
              </Route>
              <Route path="/pools">
                <Pools />
              </Route>
              <Route path="/lottery">
                <Lottery />
              </Route>
              <Route path="/ifo">
                <Ifos />
              </Route>
              <Route exact path="/teams">
                <Teams />
              </Route>
              <Route path="/teams/:id">
                <Team />
              </Route>
              <Route path="/create-profile">
                <ProfileCreation />
              </Route>
              <Route path="/competition">
                <TradingCompetition />
              </Route>
              <Route exact path="/prediction">
                <Predictions />
              </Route>
              <Route path="/prediction/leaderboard">
                <PredictionsLeaderboard />
              </Route>
              <Route exact path="/voting">
                <Voting />
              </Route>
              <Route exact path="/voting/proposal/create">
                <CreateProposal />
              </Route>
              <Route path="/voting/proposal/:id">
                <Proposal />
              </Route>

              {/* NFT */}
              <Route path="/nfts">
                <NftMarket />
              </Route>

              <Route path="/pancake-squad">
                <PancakeSquad />
              </Route>

              {/* Info pages */}
              <Route path="/info">
                <Info />
              </Route>

              {/* Using this format because these components use routes injected props. We need to rework them with hooks */}
              <Route exact strict path="/" component={Swap} />
              <Route exact strict path="/swap" component={Swap} />
              <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
              <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
              <Route exact strict path="/find" component={PoolFinder} />
              <Route exact strict path="/liquidity" component={Liquidity} />
              <Route exact strict path="/create" component={RedirectToAddLiquidity} />
              <Route exact path="/add" component={AddLiquidity} />
              <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
              <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
              <Route exact path="/create" component={AddLiquidity} />
              <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
              <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
              <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
              <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />

              {/* Redirect */}
              <Route path="/pool">
                <Redirect to="/liquidity" />
              </Route>
              <Route path="/staking">
                <Redirect to="/pools" />
              </Route>
              <Route path="/syrup">
                <Redirect to="/pools" />
              </Route>
              <Route path="/collectibles">
                <Redirect to="/nfts" />
              </Route>
              <Route path="/profile">
                <Redirect to={`${nftsBaseUrl}/profile/${account?.toLowerCase() || ''}`} />
              </Route>

              {/* 404 */}
              <Route component={NotFound} />
            </Switch>
          </SuspenseWithChunkError>
          <EasterEgg iterations={2} />
          <ToastListener />
          <DatePickerPortal />
        </div>
      </div>
      {/* <div className="menu-wrapper">

        <Navbar bg="dark" expand="lg">
          <Container fluid>
            <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
              <Button
                variant="dark"
                className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fas fa-ellipsis-v" />
              </Button>
              <Navbar.Brand
                href="#home"
                onClick={(e) => e.preventDefault()}
                className="mr-2"
              >
                foobar
              </Navbar.Brand>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
              <span className="navbar-toggler-bar burger-lines" />
              <span className="navbar-toggler-bar burger-lines" />
              <span className="navbar-toggler-bar burger-lines" />
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="nav mr-auto" navbar>
                <Nav.Item>
                  <Nav.Link
                    data-toggle="dropdown"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    className="m-0"
                  >
                    <i className="nc-icon nc-palette" />
                    <span className="d-lg-none ml-1">Dashboard</span>
                  </Nav.Link>
                </Nav.Item>
                <Dropdown as={Nav.Item}>
                  <Dropdown.Toggle
                    as={Nav.Link}
                    data-toggle="dropdown"
                    id="dropdown-67443507"
                    variant="default"
                    className="m-0"
                  >
                    <i className="nc-icon nc-planet" />
                    <span className="notification">5</span>
                    <span className="d-lg-none ml-1">Notification</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Notification 1
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Notification 2
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Notification 3
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Notification 4
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another notification
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Nav.Item>
                  <Nav.Link
                    className="m-0"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="nc-icon nc-zoom-split" />
                    <span className="d-lg-block">Search</span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Nav className="ml-auto" navbar>
                <Nav.Item>
                  <Nav.Link
                    className="m-0"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="no-icon">Account</span>
                  </Nav.Link>
                </Nav.Item>
                <Dropdown as={Nav.Item}>
                  <Dropdown.Toggle
                    aria-expanded={false}
                    as={Nav.Link}
                    data-toggle="dropdown"
                    id="navbarDropdownMenuLink"
                    variant="default"
                    className="m-0"
                  >
                    <span className="no-icon">Dropdown</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                    <Dropdown.Item
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something else here
                    </Dropdown.Item>
                    <div className="divider" />
                    <Dropdown.Item
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Separated link
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Nav.Item>
                  <Nav.Link
                    className="m-0"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="no-icon">Log out</span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div> */}

    </Router>
  )
}

export default React.memo(App)
