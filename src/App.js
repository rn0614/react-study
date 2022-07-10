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
function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onCreate(title, body);
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <textarea
            name="body"
            id=""
            cols="30"
            rows="10"
            placeholder="content"
          />
        </p>
        <p>
          <input type="submit" value="create" />
        </p>
      </form>
    </article>
  );
}
// 초기 실행 한번시 실행되는 문장
export default function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'content1' },
    { id: 2, title: 'css', body: 'content2' },
    { id: 3, title: 'javascript', body: 'content3' },
  ]);
  let content = null;
  let contextControl = null;
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
    contextControl = (
      <li>
        <a
          href="/update"
          onClick={(event) => {
            event.preventDefault();
            setMode('UPDATE');
          }}
        >
          update
        </a>
      </li>
    );
  } else if (mode === 'CREATE') {
    content = (
      <Create
        onCreate={(title, body) => {
          const newTopic = { id: nextId, title, body };
          const newTipics = [...topics];
          newTipics.push(newTopic);
          setTopics(newTipics);
          setMode('READ');
          setId(nextId);
          setNextId(nextId + 1);
        }}
      ></Create>
    );
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
      <ul>
        <li>
          <a
            href="/create"
            onClick={(event) => {
              event.preventDefault();
              setMode('CREATE');
            }}
          >
            create
          </a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
}
