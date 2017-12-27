import React, { Component } from 'react';
import Comment from '../view/Comment'
import styles from '../styles'

class Comments extends Component {
    constructor() {
        super()

        this.state = {
            list: [
                { body: 'A Lorem Ipsum egy egyszerû szövegrészlete, szövegutánzata a betûszedõ és nyomdaiparnak. A Lorem Ipsum az 1500-as évek óta standard szövegrészletként szolgált az iparban; mikor egy ismeretlen nyomdász összeállította a betûkészletét és egy példa-könyvet vagy szöveget nyomott papírra, ezt használta. Nem csak 5 évszázadot élt túl, de az elektronikus betûkészleteknél is változatlanul megmaradt. Az 1960-as években népszerûsítették a Lorem Ipsum részleteket magukbafoglaló Letraset lapokkal, és legutóbb softwarekkel mint például az Aldus Pagemaker.', username: 'dtrump', timestamp: '10:30' },
                { body: 'A Lorem Ipsum egy egyszerû szövegrészlete, szövegutánzata a betûszedõ és nyomdaiparnak. A Lorem Ipsum az 1500-as évek óta standard szövegrészletként szolgált az iparban; mikor egy ismeretlen nyomdász összeállította a betûkészletét és egy példa-könyvet vagy szöveget nyomott papírra, ezt használta. Nem csak 5 évszázadot élt túl, de az elektronikus betûkészleteknél is változatlanul megmaradt. Az 1960-as években népszerûsítették a Lorem Ipsum részleteket magukbafoglaló Letraset lapokkal, és legutóbb softwarekkel mint például az Aldus Pagemaker.', username: 'hclinton', timestamp: '10:45' },
                { body: 'A Lorem Ipsum egy egyszerû szövegrészlete, szövegutánzata a betûszedõ és nyomdaiparnak. A Lorem Ipsum az 1500-as évek óta standard szövegrészletként szolgált az iparban; mikor egy ismeretlen nyomdász összeállította a betûkészletét és egy példa-könyvet vagy szöveget nyomott papírra, ezt használta. Nem csak 5 évszázadot élt túl, de az elektronikus betûkészleteknél is változatlanul megmaradt. Az 1960-as években népszerûsítették a Lorem Ipsum részleteket magukbafoglaló Letraset lapokkal, és legutóbb softwarekkel mint például az Aldus Pagemaker.', username: 'gjohnson', timestamp: '11:30' }
            ]
        }
    }

    submitComment() {
        console.log(this.innerHTML);
        
    }



    render() {
        return (
            <div>
                <h2>Comments: Zone 1</h2>
                <div>
                    <ul style={styles.comment.commentsList}>
                        {this.state.list.map((comment, i) => <li key={i}><Comment comment={comment} /></li>)}
                    </ul>
                    <div style={styles.insertComment.input} className="form-group">
                        <input style={styles.insertComment.formControl} className="form-control" type="text" placeholder="Username" />
                        <input style={styles.insertComment.formControl} className="form-control" type="text" placeholder="Comment" />
                        <button onClick={this.submitComment.bind(this)} className="btn btn-submit">Submit Comment</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comments;