import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from '../containers/login/login'
import AutoRoute from './authRoute/authRoute'
import Layout from './layout/layout'
import PersonCenter from './personCenter/personCenter'
import Editor from './editor/editor'
import forumCreateProblem from './forumCreateProblem/forumCreateProblem'
import Home from '../containers/home/home'
import OnlineStudying from '../containers/onlineStudying/onlineStudying'
import Forum from '../containers/forum/forum'
import ForumProblemPage from './forumProblemPage/forumProblemPage'
import ForumProblemTypePage from './forumProblemTypePage/forumProblemTypePage'
import Opinion from '../containers/opinion/opinion'
import Footer from './footer/footer'
import Admin from '../adminComponents/admin/admin'
import VideoPage from './video/videoPage'
import ArticleSample from '../components/articleSample/ArticleSample'
import OpinionFocus from './opinionFocus/opinionFocus'
import ArticleExcellentSeven from './articleExcellentSeven/articleExcellentSeven'
import ArticleExcellentThirty from './ArticleExcellentThirty/ArticleExcellentThirty'
import CoursePreview from './coursePreview/coursePreview'
import Search from '../containers/search/search'
import ShoppingCart from '../components/shoppingCart/shoppingCart'
import MessageCenter from '../containers/messageCenter/messageCenter'
import '@/assets/styles/normalize.scss'
// icon图标
import '@/assets/styles/font/icon.css'
import opinionRecommend from './opinionRecommend/opinionRecommend'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			hasError: false,
		}
	}
	componentDidCatch(error, info) {
		this.setState({
			hasError: true,
		})
	}
	render() {
		return (
			<React.Fragment>
				{/* 检验是否有登录信息 */}
				<AutoRoute />
				<Switch>
					<Route path='/login' component={Login} />
					<Route path='/editor' component={Editor} />
					<Route path='/admin' component={Admin} />
					<Route path='/video/:courseId' component={VideoPage} />
					<Route
						path='/'
						render={(props) => (
							<React.Fragment>
								<Layout>
									<Switch>
										<Route path='/home' component={Home} />
										<Route path='/search/:content' component={Search} />
										<Route path='/shoppingCart' component={ShoppingCart} exact/>
										<Route path='/messageCenter' component={MessageCenter} />
										<Route path='/onlineStudying' component={OnlineStudying} />
										<Route path='/forum' component={Forum} exact />
										<Route path='/forum/create' component={forumCreateProblem} exact />
										<Route path='/forum/details/:id' component={ForumProblemPage} />
										<Route path='/forum/type/:type' component={ForumProblemTypePage} />
										<Route path='/opinion' component={opinionRecommend} exact />
										<Route path='/opinion/focus' component={OpinionFocus} exact />
										<Route path='/opinion/:category' component={Opinion} />
										<Route path='/personCenter/:id' component={PersonCenter} />
										<Route path='/article/:id' component={ArticleSample} />
										<Route path='/excellentSeven' component={ArticleExcellentSeven} />
										<Route path='/excellentThirty' component={ArticleExcellentThirty} />
										<Route path='/class/:courseId' component={CoursePreview} />
										<Redirect to={{ pathname: '/home' }} />
									</Switch>
								</Layout>
								<Footer />
							</React.Fragment>
						)}
					/>
				</Switch>
			</React.Fragment>
		)
	}
}
export default App
