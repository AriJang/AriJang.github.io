<script>
import { goToStart, goBackFiveMoves, undoMove, redoMove, goForwardFiveMoves, goToEnd } from '../stores/goStore';
</script>

<div class="media-buttons">
    <button class="button" on:click={goToStart}>처음으로</button>
    <button class="button" on:click={goBackFiveMoves}>5수 뒤로</button>
    <button class="button" on:click={undoMove}>한 수 뒤로</button>
    <button class="button" on:click={redoMove}>한 수 앞으로</button>
    <button class="button" on:click={goForwardFiveMoves}>5수 앞으로</button>
    <button class="button" on:click={goToEnd}>마지막으로</button>
</div>

<style>
  .media-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
  }

  .button:hover {
    background-color: #0056b3;
  }

  .button:active {
    background-color: #004080;
  }
</style>