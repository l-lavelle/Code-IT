import '../../Variables.css';
import './Loading.css';

function Loading({loaderStyle}) {
  return (
  <div class={loaderStyle}>
    <div class="loading__letter">L</div>
    <div class="loading__letter">o</div>
    <div class="loading__letter">a</div>
    <div class="loading__letter">d</div>
    <div class="loading__letter">i</div>
    <div class="loading__letter">n</div>
    <div class="loading__letter">g</div>
    <div class="loading__letter">.</div>
    <div class="loading__letter">.</div>
    <div class="loading__letter">.</div>
  </div>
  );
}

export default Loading;
