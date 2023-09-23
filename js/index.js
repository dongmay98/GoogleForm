import {WrapSelector,WrapQuerySelectorAll} from "./util/selectorUtil.js";


const wrapper = document.querySelector(".wrapper");
const select = WrapSelector(wrapper, ".select");

const addMultiOptionBtn = WrapSelector(wrapper, ".add-multi-option-btn");
const mainContentLists = WrapSelector(wrapper,".main-content-lists");
const mainLi = WrapQuerySelectorAll(mainContentLists , "li");
// 드롭다운메뉴 셀렉터
const multiChoiceContainer = WrapQuerySelectorAll(mainContentLists , ".multi-choice-container")[0];
const shortAnswerContainer = WrapQuerySelectorAll(mainContentLists , ".short-answer-container");
const longAnswerContainer = WrapQuerySelectorAll(mainContentLists , ".long-answer-container");
const checkboxContainer = WrapQuerySelectorAll(mainContentLists , ".checkbox-container");
const dropdownContainer = WrapQuerySelectorAll(mainContentLists , ".dropdown-container");

//객관식 옵션삭제
const multiChoiceX = WrapSelector(wrapper,"multi-choice-x")

let optionCount = 1; // 옵션 카운트 초기값

function liNone() {   // li요소 none으로 변경 함수
  mainLi.forEach((li) => {
    li.style.display = "none";
  });
}

// 드롭다운 메뉴 클릭 switch case
function changeSelect(e) {
  switch (e.target.value) {
    case "객관식":
      liNone();
      multiChoiceContainer.style.display = "block";
      break;

    case "단답형":
      liNone();
      shortAnswerContainer.style.display = "block";
      break;

    case "장문형":
      liNone();
      longAnswerContainer.style.display = "block";
      break;

    case "체크박스":
      liNone();
      checkboxContainer.style.display = "block";
      break;

    case "드롭다운":
      liNone();
      dropdownContainer.style.display = "block";
      break;
  }
}
// switch case EventListener 추가
select.addEventListener("change", changeSelect);

//객관식 옵션추가 버튼 Click Event
addMultiOptionBtn.addEventListener("click", () => {
  const newDiv = document.createElement("div");

  const newInput = document.createElement("input");
  newInput.classList.add("multi-choice-input");
  newInput.type = "text";
  
  const currentOptionCount = multiChoiceContainer.querySelectorAll(".multi-choice-input").length;// 페이지에 실제로 표시된 옵션 갯수
  
  newInput.value = `옵션${currentOptionCount + 1}`; // 새로운 인풋의 value 설정

  const newX = document.createElement("button");
  newX.classList.add("multi-choice-x");
  newX.textContent = "X";

  // div에 입력 필드와 'X' 버튼을 추가
  newDiv.appendChild(newInput);
  newDiv.appendChild(newX);

   // div를 '.multi-choice-container' 내부의 '추가' 버튼 앞에 삽입
  multiChoiceContainer.insertBefore(newDiv, addMultiOptionBtn);
});


//객관식 옵션삭제 버튼 Click Event
multiChoiceContainer.addEventListener("click", (event) =>{
  if (event.target.classList.contains("multi-choice-x")) {
    // 'X' 버튼이 있는 div 요소를 찾아 제거
    event.target.parentNode.remove();

    const remainingOptions = multiChoiceContainer.querySelectorAll(".multi-choice-input");
    remainingOptions.forEach((option, index) => {
      option.value = `옵션${index + 1}`;
    });
  }
});