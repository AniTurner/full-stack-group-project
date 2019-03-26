import React,{Component} from 'react'
import { withListData } from '../context/BigDataProvider.js'
class UserCategory extends Component{
    constructor(props){
        super(props)
    }
    
    componentDidMount = () => {

    }
    render(){
        console.log(this.props.allCategories)
        return(
            <main>
                <div id="portfilio-category-screen" className="center-crop">
                    {
                        this.props.allCategories.map(category => 
                            (category._id === this.props.match.params._categoryid) ? 
                            <>
                             <h2>{category.title}</h2>
                            </>
                             :
                             null
                        )
                    }
                    
                    {
                        this.props.allPortfolioItems.map(item => 
                            (item.categoryId === this.props.match.params._categoryid) ? 
                           <>
                            <img src={item.imgUrl} width="300" alt={item.title}/>
                           </>
                            :
                            null
                        )
                    }

                    
                    
                </div>
            </main>
        )
    }
}

export default withListData(UserCategory)