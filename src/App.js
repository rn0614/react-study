import React from 'react';
import './style.css';
import { useState } from 'react';

function Header(props) {
  //console.log('props', props, props.title);
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}
function Nav(props) {
  const lis = [];
  for (let content of props.topics) {
    lis.push(
      <li key={content.id}>
        <a
          id={content.id}
          href={'/read/' + content.id}
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode(Number(event.target.id));
          }}
        >
          {content.title}
        </a>
      </li>
    );
  }
  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}
function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}
// 초기 실행 한번시 실행되는 문장
export default function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const topics = [
    { id: 1, title: 'html', body: 'content1' },
    { id: 2, title: 'css', body: 'content2' },
    { id: 3, title: 'javascript', body: 'content3' },
  ];
  let content = null;
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB"></Article>;
  } else if (mode === 'READ') {
    let title,
      body = null;
    for (let topic of topics) {
      if (topic.id === id) {
        title = topic.title;
        body = topic.body;
      }
    }
    content = <Article title={title} body={body}></Article>;
  }
  return (
    <div>
      <Header
        title="WEB"
        onChangeMode={() => {
          setMode('WELCOME');
          alert('Header');
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(id) => {
          setMode('READ');
          setId(id);
          alert(id);
        }}
      ></Nav>
      {content}
    </div>
  );
}
