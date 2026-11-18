/* AI theory view: trusted static teaching text, no HTML string injection. */
(()=>{
 const lessons=window.AI_LESSONS||[];
 const root=document.getElementById('ai-lessons');
 const link=(href,label,extraClass='')=>{const a=document.createElement('a');a.href=href;a.textContent=label;a.className='ai-link '+extraClass;return a;};
 const txt=(tag,cls,value)=>{const e=document.createElement(tag);if(cls)e.className=cls;e.textContent=value;return e;};
 // Shared navigation is the single source of truth for theory and advanced lessons.
 const navItems=[['index.html','AI 전체 목차','index'],...lessons.map(x=>['step-'+String(x.id).padStart(2,'0')+'.html',String(x.id)+'단계',String(x.id)]),['agent-frameworks.html','심화 A','advanced-a'],['llm-building.html','심화 B','advanced-b']];
 const nav=(current)=>{const n=document.createElement('nav');n.className='ai-tabs';n.setAttribute('aria-label','AI 학습 단계 이동');navItems.forEach(([href,name,id])=>{const a=document.createElement('a');a.href=href;a.textContent=name;if(String(current)===id)a.setAttribute('aria-current','page');n.append(a)});return n;};
 document.querySelectorAll('[data-ai-nav]').forEach(slot=>slot.replaceWith(nav(slot.dataset.aiNav)));
 if(!root)return;
 const step=Number(root.dataset.step||0);
 const createHeader=(title,subtitle,eyebrow,current)=>{const h=document.createElement('header');h.className='ai-header';const home=document.createElement('a');home.href='../index.html';home.className='ai-home';home.textContent='Frontend Lab · 강의 홈';h.append(home,txt('span','ai-kicker',eyebrow),txt('h1','',title),txt('p','',subtitle),nav(current));return h;};
 const footer=(current)=>{const sec=document.createElement('nav');sec.className='ai-bottom';sec.setAttribute('aria-label','다른 AI 학습 페이지');sec.append(txt('h2','','다른 학습 페이지로 이동'));const links=document.createElement('div');links.className='ai-bottom-links';if(current){if(current>1)links.append(link('step-'+String(current-1).padStart(2,'0')+'.html','← 이전 단계'));links.append(link('quiz-'+String(current).padStart(2,'0')+'.html',current+'단계 문제 풀기','primary'));if(current<lessons.length)links.append(link('step-'+String(current+1).padStart(2,'0')+'.html','다음 단계 →'));}if(current===lessons.length){const guide=link('https://github.com/JJinMangGo/JJinMangGo/tree/main/ai-system-design-easy','심화 읽기 · AI 시스템 설계 20편 →');guide.target='_blank';guide.rel='noopener noreferrer';links.append(guide)}
 links.append(link('index.html','AI 전체 목차'));links.append(link('../index.html','Frontend Lab 홈'));sec.append(links);return sec;};
 if(!step){
 root.append(createHeader('AI 기초부터 에이전트까지','어려운 AI 용어를 쉬운 비유와 실무 사례로 배우는 6단계 학습 과정','AI LEARNING · 6 STEPS',0));
 const grid=document.createElement('div');grid.className='ai-grid';
 for(const lesson of lessons){const card=document.createElement('article');card.className='ai-step-card';card.append(txt('div','ai-k','STEP '+String(lesson.id).padStart(2,'0')),txt('h2','',lesson.title),txt('p','desc',lesson.subtitle),txt('p','terms',lesson.terms));const acts=document.createElement('div');acts.className='ai-actions';acts.append(link('step-'+String(lesson.id).padStart(2,'0')+'.html','이론 학습','primary'),link('quiz-'+String(lesson.id).padStart(2,'0')+'.html','10문제 풀기'));card.append(acts);grid.append(card)}root.append(grid);
 const advancedLessons=[
  {letter:'A',title:'AI 에이전트 개발 프레임워크',subtitle:'Claude Code·피클 같은 에이전트와 LangGraph·CrewAI·eve의 차이',terms:'Agent · Harness · Framework · HITL',theory:'agent-frameworks.html',quiz:'quiz-advanced-a.html'},
  {letter:'B',title:'LLM은 어떻게 만들어질까?',subtitle:'토큰화, 데이터 정제, 사전학습, RLHF·DPO와 평가의 흐름',terms:'Token · Training · Loss · Evaluation',theory:'llm-building.html',quiz:'quiz-advanced-b.html'}
 ];
 for(const lesson of advancedLessons){const card=document.createElement('article');card.className='ai-step-card';card.append(txt('div','ai-k','ADVANCED '+lesson.letter),txt('h2','',lesson.title),txt('p','desc',lesson.subtitle),txt('p','terms',lesson.terms));const acts=document.createElement('div');acts.className='ai-actions';acts.append(link(lesson.theory,'이론 학습','primary'),link(lesson.quiz,'10문제 풀기'));card.append(acts);grid.append(card)}
 const bottom=footer(0);const guide=link('https://github.com/JJinMangGo/JJinMangGo/tree/main/ai-system-design-easy','추가 읽기 · AI 시스템 설계 20편 →');guide.target='_blank';guide.rel='noopener noreferrer';bottom.querySelector('.ai-bottom-links').append(guide);root.append(bottom);
 }else{
 const lesson=lessons.find(x=>x.id===step);if(!lesson){root.append(txt('p','','학습 단계를 찾을 수 없습니다.'));return}
 root.append(createHeader(lesson.title,lesson.subtitle,'AI LEARNING · STEP '+String(step).padStart(2,'0'),step));
 const summary=document.createElement('section');summary.className='ai-summary';summary.append(txt('h2','','이번 시간에 배울 것'),txt('p','',lesson.subtitle));const kws=document.createElement('div');kws.className='ai-keywords';lesson.terms.split(' · ').forEach(k=>kws.append(txt('span','',k)));summary.append(kws);root.append(summary);
 lesson.blocks.forEach((block,i)=>{const [heading,definition,analogy,example,point]=block;const card=document.createElement('section');card.className='ai-topic';card.append(txt('div','ai-k','PART '+String(i+1).padStart(2,'0')),txt('h2','',heading),txt('p','definition',definition));
 const analogyBox=document.createElement('div');analogyBox.className='ai-example';analogyBox.append(txt('strong','','쉽게 이해하기'),txt('p','',analogy));card.append(analogyBox);
 const caseBox=document.createElement('div');caseBox.className='ai-case';caseBox.append(txt('strong','','수업·실무 사례'),txt('p','',example));card.append(caseBox);
 const pointBox=document.createElement('div');pointBox.className='ai-point';pointBox.append(txt('strong','','핵심 기억하기'),txt('p','',point));card.append(pointBox);root.append(card)});
 if(step===1){const check=document.createElement('section');check.className='ai-topic';check.append(txt('div','ai-k','실무 체크리스트'),txt('h2','','AI가 틀릴 때 확인하는 3단계'));const items=[['① 근거 확인','AI가 실제 자료·파일·링크를 읽었는지 확인해요.'],['② 실행 결과 확인','코드나 디자인을 수정했다면 변경 파일과 브라우저 화면을 검사해요.'],['③ 기준에 맞춰 재검증','요구사항·수치·반응형·접근성 기준으로 다시 확인하고 필요한 부분만 수정해요.']];items.forEach(([heading,body])=>{const box=document.createElement('div');box.className='ai-example';box.append(txt('strong','',heading),txt('p','',body));check.append(box)});root.append(check)}
 const boundaries={1:'이 단계에서는 모델을 실제로 학습시키거나 내부 가중치를 계산하지 않아요.',2:'이 단계에서는 완성된 코딩 에이전트나 하네스를 직접 개발하지 않아요.',3:'이 단계에서는 외부 API 인증키를 발급하거나 실제 서비스 계정을 연결하지 않아요.',4:'이 단계에서는 GPU 설정이나 로컬 모델 설치 실습을 진행하지 않아요.',5:'이 단계에서는 파인튜닝을 실행하거나 비공개 자료를 업로드하지 않아요.',6:'이 단계에서는 실제 고객 데이터를 이용한 무인 자동화를 실행하지 않아요.'};
 const scope=document.createElement('section');scope.className='ai-summary';scope.append(txt('h2','','이 단계에서 다루지 않는 것'),txt('p','',boundaries[step]));root.append(scope);
 if(step===6){
  const caseStudy=document.createElement('section');caseStudy.className='ai-topic';
  caseStudy.append(
   txt('div','ai-k','CASE STUDY · 실제 AI 서비스'),
   txt('h2','','피클(Pickle) 사례: 편리한 개인화와 개인정보의 경계'),
   txt('p','definition','한 이용자는 이메일 계정을 연결한 뒤, 다른 요청에서도 이메일에서 파악한 개인 정보가 활용되어 편리하면서도 놀랐다고 이야기했어요. 이는 이용자 경험담이며, 피클의 모든 사용자에게 같은 방식으로 작동한다는 뜻은 아니에요.')
  );
  const concepts=document.createElement('div');concepts.className='ai-example';
  concepts.append(
   txt('strong','','배운 개념을 연결해 보기'),
   txt('p','','LLM: 요청과 자료를 언어로 이해하고 답변을 생성해요.'),
   txt('p','','AI Agent · Tool: 허용된 이메일 검색 등 외부 기능을 이용해 작업을 진행할 수 있어요.'),
   txt('p','','Context · Memory: 연결된 정보와 이전 맥락을 현재 요청에 참고할 수 있어요. 단, 데이터를 다시 조회하는 것과 장기 기억으로 저장하는 것은 달라요.'),
   txt('p','','Harness · 권한 · HITL: 하네스는 어떤 이메일·자료에 접근할 수 있는지, 검색한 정보를 다른 작업에 써도 되는지, 어떤 행동에 사람 승인이 필요한지를 도구·권한·검사 절차로 통제하는 실행 구조예요.')
  );
  const ux=document.createElement('div');ux.className='ai-case';
  ux.append(
   txt('strong','','AI UX 관점에서 생각하기'),
   txt('p','','사용자가 이메일을 연결했다고 모든 작업에서 메일 내용을 사용해도 될까요? 하네스 설계에서는 정보 접근 범위, 목적별 사용 제한, 민감한 작업의 승인 단계, 사용 기록과 권한 해제 방법을 정할 수 있어요. 이런 기술적 통제와 함께 사용자가 범위를 이해하고 선택할 수 있는 UX도 필요해요.')
  );
  const takeaway=document.createElement('div');takeaway.className='ai-point';
  takeaway.append(txt('strong','','핵심 기억하기'),txt('p','','하네스는 모델을 둘러싼 도구·권한·검사·승인 절차를 설계하는 구조예요. 정보 사용 범위와 행동 권한을 제한할 수 있지만, 이것만으로 개인정보 보호가 완성되지는 않아요. 실제 서비스의 정책과 사용자 설정도 함께 확인해야 해요.'));
  caseStudy.append(concepts,ux,takeaway);root.append(caseStudy);
 }
 root.append(footer(step))
 }
 root.append(txt('p','ai-footer','JJinMangGo · Frontend Lab AI Learning'));
})();
