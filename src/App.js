/* eslint-disable */
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
    let [title, setTitle] = useState(["남자 코트 추천", "강남역 맛집", "반드시 해낸다"]);
    let [likeCount, setLikeCount] = useState([0, 0, 0]);
    const [date, setDate] = useState(["2018-01-14", "2022-06-04", "2022-06-05"]);
    const [modal, setModal] = useState([false,false,false]);
    const [valueChange,setValueChange] = useState("");

    //function 만들기 다른 형식
    const onDelete = (targetTitle,targetLikeCount,targetCopyDate,i) =>{
        //원본 유지 데이터 카피
        let copyTitle = [...title];
        let copyLikeCount = [...likeCount];
        let copyDate = [...date];
        //삭제
        copyTitle = copyTitle.filter((item)=> item !== targetTitle);
        copyLikeCount = copyLikeCount.filter((item)=> item !== targetLikeCount);
        copyDate.splice(i,1);
        //적용
        setTitle(copyTitle);
        setLikeCount(copyLikeCount);
        setDate(copyDate);

        //아이덴티티가 없어서 중복되는거 다 삭제하는 부작용!
    }

    return (
        <div className="App">
            <div className="black-nav">
                <h4>ReactBlog</h4>
            </div>
            <button onClick={() => { setTitle([...title].sort()); }}>
                정렬
            </button>

            {title.map(function (element, i) {
                return (
                    <div className="list" key={i}>
                        <h4 onClick={() => { 
                            let copyModal = [...modal];
                            copyModal[i] = !copyModal[i];
                            setModal(copyModal);
                            }}>
                            {element}
                            <span onClick={(e) => { e.stopPropagation();
                                let copyCount = [...likeCount];
                                copyCount[i] = copyCount[i] + 1;
                                setLikeCount(copyCount);
                             }}>
                                👍
                            </span>
                            {likeCount[i]}
                            <button 
                                style={{marginLeft:"20px"}} 
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    onDelete(title[i],likeCount[i],date[i],i);
                            }}>삭제</button>
                        </h4>
                        <p>
                            {date[i]} 발행
                        </p>
            {
                //조건시 ? 참일때 실행할 코드 : 거짓일 때 실행할 코드
                modal[i] === true ? <Modal postTitle = {title} setTitle = {setTitle} i = {i} /> : null
            }
                        
                    </div>
                );
                
            })
        }

        <form action="get">
            <input onChange={(e) => {setValueChange(e.target.value);}} minLength="1"/>
            <button type="submit" onClick={()=>{
                const copyTitle = [...title];
                const copyDate = [...date];
                const copyLikeCount = [...likeCount];
                copyLikeCount.unshift(0);
                copyTitle.unshift(valueChange);
                copyDate.unshift("2023-04-12");
                setLikeCount(copyLikeCount);
                setDate(copyDate);
                setTitle(copyTitle);
            }}>작성</button>
        </form>
           
        </div>
    );
}

function Modal(props) {
    return (
        <div className="modal">
            <h4>{props.postTitle[props.i]}</h4>
            <p>날짜</p>
            <p>상세내용</p>
            <button onClick={() => {
                                    let copyTitle = [...props.postTitle];
                                    copyTitle[props.i] = "여자 코트 추천";
                                    props.setTitle(copyTitle);
                                }}>
                                제목 수정
            </button>
        </div>
    );
}

export default App;
