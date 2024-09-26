<script>
  import { currentMode, toggleMoveNumbers, setWhiteMode, setBlackMode, setAlternateMode, showMoveNumbers, resetBoard, undoMove, redoMove, saveKibo,  kiboFiles, loadKiboFromLocal, loadKiboFromAssets } from '../stores/goStore';
</script>

<div class="controls">
    <button class="button white-button" class:selected={$currentMode === 'white'} on:click={setWhiteMode}></button>
    <button class="button black-button" class:selected={$currentMode === 'black'} on:click={setBlackMode}></button>
    <button class="button alternate-button" class:selected={$currentMode === 'alternate'} on:click={setAlternateMode}></button>
    <button class="button number-button" on:click={toggleMoveNumbers}>
        {#if $showMoveNumbers} 순서숨기기 {:else} 순서보이기 {/if}
    </button>
    <button class="button number-button" on:click={resetBoard} style="background-color: red;">리셋</button>
    <button class="icon-button" on:click={undoMove}>&lt;</button>
    <button class="icon-button" on:click={redoMove}>&gt;</button>
    <div class="kibo-container">
        <button class="kibo-button save" on:click={saveKibo}>기보 저장</button>
        
        <!-- 기보 불러오기 버튼 -->
        <label for="kibo-file" class="kibo-button load">기보 불러오기 (로컬)</label>
        <input type="file" id="kibo-file" class="file-input" on:change={loadKiboFromLocal} />

        <!-- 동적으로 JSON 파일 목록을 불러오는 드롭다운 -->
        <select on:change={loadKiboFromAssets} class="kibo-button load">
            <option value="">기보 선택 (assets)</option>
            {#each $kiboFiles as file}
                <option value={file}>{file}</option>
            {/each}
        </select>
    </div>
</div>

<style>
    .controls {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 10px; /* 버튼 사이 간격 */
        margin-left: 20px; /* 바둑판과 버튼들 사이 간격 */
        height: 1200px; /* 바둑판과 동일한 높이 설정 */
    }

    .button {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 4px solid transparent; /* 선택되었을 때만 테두리 */
        margin-bottom: 30px;
        cursor: pointer;
    }

    .selected {
        border-color: blue; /* 선택된 버튼 테두리 색 */
    }

    .black-button {
        background-color: black;
    }

    .white-button {
        background-color: white;
    }

    .alternate-button {
        background: linear-gradient(to bottom, white 50%, black 50%);
        border-radius: 50%;
        background-size: cover; /* 상하로 균등하게 채우기 */
    }

    .number-button {
        background-color: rgb(11, 19, 184); 
        color: white; 
        border-radius: 5px; 
        width: 100px; 
        height: 50px; 
        text-align: center; 
        line-height: 30px;
        display: flex;            /* Flexbox를 사용 */
        justify-content: center;  /* 좌우 중앙 정렬 */
        align-items: center;      /* 상하 중앙 정렬 */
    }

    .icon-button {
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background-color 0.3s ease;
    }

    .icon-button:hover {
        background-color: #0056b3;
    }

    .icon-button:active {
        background-color: #004080;
    }

    .kibo-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        margin-top: auto; /* 바둑판 하단에 맞추기 위해 자동으로 여백 추가 */
        margin-bottom: 0; /* 하단 여백 제거 */
    }

    .kibo-button {
        width: 150px; /* 고정된 폭 */
        margin-left: 20px;
        margin-top: 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 0; /* 패딩을 수직으로만 적용하여 텍스트 길이 무관하게 동일한 크기 */
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        text-align: center;
    }

    .kibo-button:hover {
        background-color: #0056b3;
    }

    .kibo-button:active {
        background-color: #004080;
    }

    .save {
        background-color: #28a745;
    }

    .save:hover {
        background-color: #218838;
    }

    .save:active {
        background-color: #1e7e34;
    }

    .load {
        background-color: #ffc107;
        color: black;
    }

    .load:hover {
        background-color: #e0a800;
    }

    .load:active {
        background-color: #c69500;
    }

    .file-input {
        display: none; /* 숨기기 */
    }
</style>
