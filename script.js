import { createElement, h, render } from "./web_modules/preact.js";
import {
  useCallback,
  useEffect,
  useRef,
  useState
} from "./web_modules/preact/hooks.js";
import htm from "./web_modules/htm.js";

const html = htm.bind(h);

const App = () => {
  const [todos, setTodos] = useState([
    { content: "foo", done: false },
    { content: "bar", done: true }
  ]);

  const newTodoRef = useRef(null);
  const onKeyDown = useCallback(e => {
    if (e.key !== "Enter") {
      return;
    }

    if (newTodoRef.current && newTodoRef.current.value) {
      setTodos([...todos, { content: newTodoRef.current.value, done: false }]);
      newTodoRef.current.value = "";
    }
  });

  useEffect(() => {
    if (newTodoRef.current) {
      newTodoRef.current.focus();
    }
  }, [newTodoRef]);

  const _todos = todos.map(({ content, done }) => html`
    <label>
      <input type="checkbox" checked=${done} />
      <span class="label-body">${content}</span>
    </label>
  `);

  return html`
    <div class="container">
      <h1>Pika Todo</h1>
      <div class="row">
        <div class="twelve columns">
          <input
            ref=${newTodoRef}
            onKeyDown=${onKeyDown}
            class="u-full-width"
            type="text"
            placeholder="new todo..."
          />
        </div>
      </div>
      ${_todos}
    </div>
  `;
};

const app = html`<${App} />`;
render(app, document.getElementById("app"));
