/* eslint-disable */
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
    const [post,setPost] = useState([
        {
            title : "남자 코트 추천",
            likeCount : 0,
            date : "2018-01-14",
            content: "코트는 롱코트!",
            modal : false
        },
        {
            title : "강남역 맛집",
            likeCount : 0,
            date : "2022-06-04",
            content: "강남역은 사람 많아요...!",
            modal : false
        },
        {
            title : "반드시 해낸다",
            likeCount : 0,
            date : "2022-06-05",
            content : "난 반드시 해내는 사람임!",
            modal : false
        }
    ])
    const [valueChange,setValueChange] = useState("");
    let date = new Date();
    return (
        <div className="App">
            <div className="black-nav">
                <h4>ReactBlog</h4>
            </div>
            <button onClick={() => { setTitle([...title].sort()); }}>
                정렬
            </button>

            {
            post&&post.map(function (element, i) {
                return (
                    <div className="list" key={i}>
                        <h4 onClick={()=>{
                            //배열 안의 객체를 복사하는 방법
                            let copyPost = JSON.parse(JSON.stringify(post));
                            copyPost[i].modal = !element.modal;           
                            setPost(copyPost);
                        }}>
                            {element.title}
                            <span onClick={(e)=>{
                                //좋아요 횟수 카운트 업
                                e.stopPropagation();
                                const copyPost = JSON.parse(JSON.stringify(post));
                                const copyElement = JSON.parse(JSON.stringify(element));
                                copyElement.likeCount += 1;
                                copyPost[i] = copyElement;
                                setPost(copyPost);
                            }}>
                                👍
                            </span>
                            {element.likeCount}
                            <button style={{marginLeft:"20px"}} onClick={(e)=>{
                                e.stopPropagation();
                                const copyPost = JSON.parse(JSON.stringify(post));
                                //삭제 방법1
                                copyPost.splice(i,1);
                                setPost(copyPost);
                            }}>삭제</button>
                        </h4>
                        <p>
                            {element.date} 발행
                        </p>
            {
                //조건시 ? 참일때 실행할 코드 : 거짓일 때 실행할 코드
                element.modal === true ? <Modal element = {element} post= {post} setPost = {setPost} valueChange = {valueChange} setValueChange = {setValueChange} i = {i} /> : null
            }
                        
                    </div>
                );
                
            })
        }

        <form action="get">
            <input onChange={(e) => {setValueChange(e.target.value);}} minLength="1"/>
            <button type="submit" onClick={(e)=>{
                //새로고침 방지
                e.preventDefault();
                const copyPost = JSON.parse(JSON.stringify(post));
                const newPost = {
                    title : valueChange,
                    likeCount : 0,
                    date : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
                    content : "해당 게시글은 그냥 만들어졌습니다. 아직 콘텐츠 내용 추가 안만듬.",
                    modal : false
                };
                copyPost.unshift(newPost);
                setPost(copyPost);
            }}>작성</button>
        </form>
           
        </div>
    );
}

function Modal(props) {
    return (
        <div className="modal">
            <h4>{props.element.title}</h4>
            <p>{props.element.date}</p>
            <p>{props.element.content}</p>
            <form action="get">
                <input onChange={(e)=>{props.setValueChange(e.target.value)}} minLength="1"/>
                <button type="submit" onClick={(e) => {
                                        // //배열 안의 객체를 복사하는 방법
                                        e.preventDefault();
                                        let copyElement = JSON.parse(JSON.stringify(props.element));
                                        let copyPost = JSON.parse(JSON.stringify(props.post));
                                        copyElement.title = props.valueChange;
                                        copyPost[props.i] = copyElement;
                                        props.setPost(copyPost);
                                    }}>
                                    제목 수정
                </button>
            </form>
        </div>
    );
}

export default App;


