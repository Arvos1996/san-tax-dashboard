import React, {Component} from 'react';
import {Divider} from "antd";
import {Footer} from "antd/es/layout/layout";

export class NewFooter extends Component {
    render() {
        return (
            <div>
                <Footer style={{textAlign: 'center'}}>By Arvos
                    <Divider>
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/Arvos1996/san-tax-dashboard"> Click here for GitHub-Repo</a>
                    </Divider>
                </Footer>
            </div>
        );
    }
}

export default NewFooter;