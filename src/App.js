/* eslint-disable */
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
    let [title, setTitle] = useState(["남자 코트 추천", "강남역 맛집", "반드시 해낸다"]);
    let [likeCount, setLikeCount] = useState([0, 0, 0]);
    const [date, setDate] = useState(["2018-01-14", "2022-06-04", "2022-06-05"]);
    const [modal, setModal] = useState(false);

    return (
        <div className="App">
            <div className="black-nav">
                <h4>ReactBlog</h4>
            </div>
            <button
                onClick={() => {
                    setTitle([...title].sort());
                }}
            >
                정렬
            </button>

            {title.map(function (element, i) {
                return (
                    <div className="list" key={i}>
                        <h4
                            onClick={() => {
                                setModal(!modal);
                            }}
                        >
                            {element}
                            <span
                                onClick={() => {
                                    let copyCount = [...likeCount];
                                    copyCount[i] = copyCount[i] + 1;
                                    setLikeCount(copyCount);
                                }}
                            >
                                👍
                            </span>
                            {likeCount[i]}
                        </h4>
                        <p>
                            {date[i]} 발행
                            <button
                                onClick={() => {
                                    let copyTitle = [...title];
                                    copyTitle[0] = "여자 코트 추천";
                                    setTitle(copyTitle);
                                }}
                            >
                                제목 바꾸기
                            </button>
                        </p>
                    </div>
                );
            })}

            {
                //조건시 ? 참일때 실행할 코드 : 거짓일 때 실행할 코드
                modal === true ? <Modal /> : null
            }
        </div>
    );
}

function Mine() {
    return (
        <div className="">
            <p>여기는 컴포넌트 내부</p>
        </div>
    );
}

function Modal() {
    return (
        <div className="modal">
            <h4>제목</h4>
            <p>날짜</p>
            <p>상세내용</p>
        </div>
    );
}

export default App;
