import React,{Component} from 'react'
import { withListData } from '../context/BigDataProvider.js'
class UserCategory extends Component{
    constructor(props){
        super(props)
    }
    
    componentDidMount = () => {

    }
    render(){
        return(
            <main>
                <div id="portfilio-category-screen" className="center-crop">
                
                    <h2>Portfolio Category</h2>
                    {
                        // this.props.allPortfolioItem.map(item => 
                        //     (item.categoryId === this.props.match.params._categoryid) ? 
                        //     <h1>Helo</h1>
                        //     :
                        //     null
                        // )
                    }
                    
                </div>
            </main>
        )
    }
}

export default withListData(UserCategory)