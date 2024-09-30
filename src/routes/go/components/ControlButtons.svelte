<script>
import { goToStart, goBackFiveMoves, undoMove, redoMove, goForwardFiveMoves, goToEnd, toggleTryMode, isTryModeActive, isKiboLoaded, undoTryMove } from '../stores/goStore';

function handleUndo(event) {
    event.preventDefault(); 
    if ($isTryModeActive) {
      undoTryMove();
    } else {
      undoMove(); 
    }
  }
</script>

<div class="media-buttons">
    <button class="button" on:click={toggleTryMode} disabled={!$isKiboLoaded}>
        {#if $isTryModeActive}
          놓아보기 종료
        {:else}
          놓아보기 시작
        {/if}
    </button>
    <button class="button" on:click={goToStart} disabled={$isTryModeActive}>처음으로</button>
    <button class="button" on:click={goBackFiveMoves} disabled={$isTryModeActive}>5수 뒤로</button>
    <button class="button" on:click={handleUndo}>한 수 뒤로</button>
    <button class="button" on:click={redoMove} disabled={$isTryModeActive}>한 수 앞으로</button>
    <button class="button" on:click={goForwardFiveMoves} disabled={$isTryModeActive}>5수 앞으로</button>
    <button class="button" on:click={goToEnd} disabled={$isTryModeActive}>마지막으로</button>
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
  .button:disabled {
        background-color: #cccccc;  /* 비활성화된 버튼의 색상 */
        color: #666666;  /* 비활성화된 텍스트 색상 */
        cursor: not-allowed;  /* 비활성화 시 커서 표시 */
    }

    .button:hover:not(:disabled) {
        background-color: #0056b3;  /* 활성화된 버튼에 마우스 오버 시 색상 */
    }
</style>