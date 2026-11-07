"use strict";
// No remote calls; attempts are checked in the browser only.
const questions=[
 {q:"AI가 문서를 찾아 읽고, 그 내용을 바탕으로 답변을 생성했다. 어떤 개념에 가장 가까울까?",options:["MCP","RAG","파인튜닝","토큰"],answer:1,reason:"RAG는 필요한 자료를 검색해 답변 생성에 활용하는 방식이야."},
 {q:"AI 앱이 외부 디자인 도구의 기능을 공통 표준을 통해 사용하도록 연결했다. 무엇일까?",options:["메모리","컨텍스트 윈도우","MCP","Inference"],answer:2,reason:"MCP는 AI 애플리케이션이 외부 도구와 데이터를 사용하는 표준이야."},
 {q:"AI API의 사용 요금과 연관되지만 그 자체가 돈은 아닌 텍스트 처리 단위는?",options:["토큰","프롬프트","하네스","스킬"],answer:0,reason:"토큰은 모델이 텍스트를 처리하는 기본 단위야. 일부 서비스는 토큰 수로 요금을 계산해."},
 {q:"학습된 모델이 질문을 입력받고 답변을 생성하는 실행 과정은?",options:["Training","Fine-tuning","Retrieval","Inference"],answer:3,reason:"Inference(인퍼런스)는 학습된 모델을 사용해 결과를 생성하는 과정이야."},
 {q:"AI가 중요한 파일을 삭제하기 전에 사람이 확인하고 승인하도록 했다. 무엇일까?",options:["RAG","HITL","SLM","MCP"],answer:1,reason:"HITL은 AI 작업 과정에 사람이 판단과 승인 등으로 개입하는 방식이야."}
];
const root=document.getElementById("questions"), form=document.getElementById("quiz-form"), results=document.getElementById("results"), progress=document.getElementById("progress");
function render(){root.replaceChildren();questions.forEach((item,i)=>{const section=document.createElement("div");section.className="ai-quiz-question";const fieldset=document.createElement("fieldset");const legend=document.createElement("legend");legend.textContent=(i+1)+". "+item.q;fieldset.append(legend);item.options.forEach((option,j)=>{const label=document.createElement("label");label.className="ai-choice";const input=document.createElement("input");input.type="radio";input.name="question-"+i;input.value=String(j);input.addEventListener("change",updateProgress);label.append(input,document.createTextNode(option));fieldset.append(label)});const feedback=document.createElement("div");feedback.id="feedback-"+i;feedback.hidden=true;feedback.className="ai-feedback";section.append(fieldset,feedback);root.append(section)});results.textContent="";updateProgress()}
function updateProgress(){const count=questions.filter((_,i)=>form.querySelector('input[name="question-'+i+'"]:checked')).length;progress.textContent=count+"/"+questions.length+"문제 선택"}
form.addEventListener("submit",event=>{event.preventDefault();let score=0;questions.forEach((item,i)=>{const checked=form.querySelector('input[name="question-'+i+'"]:checked');const choice=checked?Number(checked.value):-1;const correct=choice===item.answer;if(correct)score++;const box=document.getElementById("feedback-"+i);box.hidden=false;box.dataset.result=correct?"correct":"wrong";box.textContent=(correct?"정답. ":"정답: "+item.options[item.answer]+". ")+item.reason;});results.textContent="총 "+(score*20)+"점 / 100점 · "+score+"/"+questions.length+"문제 정답";results.className="ai-memory";results.scrollIntoView({behavior:"smooth",block:"nearest"});});
form.addEventListener("reset",()=>{requestAnimationFrame(()=>{render();progress.textContent="0/5문제 선택"})});
render();
