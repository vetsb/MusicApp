import React, {Component} from 'react';
import SearchItem from "../SearchItem";

class SearchGroup extends Component {
    render() {
        return (
            <div className={"search__dropdown_group search__dropdown_group--" + this.props.type}>
                <h3>{this.props.title}</h3>
                <div className="search__dropdown_items">
                    {this.props.items.map((item, key) => {
                        return <SearchItem item={item} key={key} type={this.props.type} onLinkClick={this.props.onLinkClick}/>
                    })}
                </div>
            </div>
        );
    }
}

export default SearchGroup;