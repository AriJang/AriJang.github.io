<script>
    let currentMode = 'alternate'; // 기본 모드는 번갈아 가며 놓기
    let currentStone = 'black'; // 첫 돌은 검정색
    const boardSize = 21;
    let board = Array(boardSize).fill().map(() => Array(boardSize).fill(null));

    // 순서를 기록할 변수
    let moveCount = 0;
    let moveHistory = Array(boardSize).fill().map(() => Array(boardSize).fill(null));

    // 모든 돌의 히스토리를 기록할 배열
    let history = [];

    // 숫자 표시 여부를 제어하는 변수
    let showMoveNumbers = true;

    const starPoints = [
        { x: 4, y: 4 },
        { x: 4, y: 10 },
        { x: 4, y: 16 },
        { x: 10, y: 4 },
        { x: 10, y: 10 },
        { x: 10, y: 16 },
        { x: 16, y: 4 },
        { x: 16, y: 10 },
        { x: 16, y: 16 }
    ];

    // 숫자 표시 여부를 토글하는 함수
    function toggleMoveNumbers() {
        showMoveNumbers = !showMoveNumbers;
    }

    // 돌을 놓는 함수
    function placeStone(x, y) {
        if (board[x][y] === null) {
            // 현재 돌을 놓음
            board[x][y] = currentStone;

            moveCount++;
            moveHistory[x][y] = moveCount; // 돌의 순서 기록

            // 상대방 돌이 둘러싸였는지 체크
            const capturedStones = checkCaptured(x, y);

            // 히스토리에 돌의 위치와 돌 색상, 사석 그룹 기록
            history.push({ 
                x, 
                y, 
                stone: currentStone, 
                capturedStones 
            });

            // 다음 차례로 돌 교체
            if (currentMode === 'alternate') {
                currentStone = currentStone === 'black' ? 'white' : 'black';
            }
            
        } else {
            board[x][y] = null;
        }
    }

    // 되돌리기 기능
    function undoMove(event) {
        event.preventDefault(); // 오른쪽 클릭 시 기본 메뉴 방지
        if (history.length > 0) {
            const lastMove = history.pop(); // 마지막에 놓은 돌을 제거
            const { x, y, capturedStones } = lastMove;

            // console.log("undo lastMove=", lastMove);

            // 바둑판에서 해당 돌 제거
            board[x][y] = null; 
            moveHistory[x][y] = null; // 순서 정보도 제거
            moveCount--; // 돌 순서 감소

            // 사석으로 제거된 돌 복원
            for (let { x: capturedX, y: capturedY, stone } of capturedStones) {
                board[capturedX][capturedY] = stone;
            }

            // 마지막 돌의 색상으로 돌 차례를 되돌림
            currentStone = lastMove.stone;
        }
    }

    // 사석 확인 함수
    function checkCaptured(x, y) {
        const opponent = currentStone === 'black' ? 'white' : 'black'; // 상대방 돌 색상
        const directions = [
            { dx: -1, dy: 0 }, // 위쪽
            { dx: 1, dy: 0 },  // 아래쪽
            { dx: 0, dy: -1 }, // 왼쪽
            { dx: 0, dy: 1 }   // 오른쪽
        ];

        const capturedStones = []; // 사석으로 제거된 돌들

        // 현재 돌의 상하좌우에 있는 상대방 돌을 탐색
        for (let { dx, dy } of directions) {
            const newX = x + dx;
            const newY = y + dy;

            // 보드 경계 안에 있고 상대방 돌이 있을 경우 체크
            if (newX > 0 && newX < boardSize && newY > 0 && newY < boardSize && board[newX][newY] === opponent) {
                const group = findGroup(newX, newY, opponent);
                if (isSurrounded(group)) {
                    capturedStones.push(...group); // 사석으로 제거된 그룹 기록
                    removeGroup(group); // 그룹이 포위되었으면 제거
                }
            }
        }

        // console.log("capturedStones=", capturedStones);

        return capturedStones; // 사석으로 제거된 돌 그룹 반환
    }

    // 그룹을 찾는 함수 (재귀적으로 연결된 같은 색 돌을 찾음)
    function findGroup(x, y, stoneType, visited = new Set()) {
        const group = [];
        const stack = [{ x, y }];
        visited.add(`${x},${y}`);

        const directions = [
            { dx: -1, dy: 0 }, // 위쪽
            { dx: 1, dy: 0 },  // 아래쪽
            { dx: 0, dy: -1 }, // 왼쪽
            { dx: 0, dy: 1 }   // 오른쪽
        ];

        while (stack.length > 0) {
            const { x: currentX, y: currentY } = stack.pop();
            // 좌표와 해당 위치의 돌 색상 정보를 함께 저장
            group.push({ x: currentX, y: currentY, stone: board[currentX][currentY] });

            for (let { dx, dy } of directions) {
                const newX = currentX + dx;
                const newY = currentY + dy;

                // 같은 종류의 돌을 찾고, 재귀적으로 그룹에 추가
                if (newX > 0 && newX < boardSize && newY > 0 && newY < boardSize &&
                    board[newX][newY] === stoneType && !visited.has(`${newX},${newY}`)) {
                    visited.add(`${newX},${newY}`);
                    stack.push({ x: newX, y: newY });
                }
            }
        }

        return group;
    }

    // 그룹이 포위되었는지 확인하는 함수
    function isSurrounded(group) {
        const directions = [
            { dx: -1, dy: 0 }, // 위쪽
            { dx: 1, dy: 0 },  // 아래쪽
            { dx: 0, dy: -1 }, // 왼쪽
            { dx: 0, dy: 1 }   // 오른쪽
        ];

        for (let { x, y } of group) {
            for (let { dx, dy } of directions) {
                //console.log("x=", x, " y=", y, " dx=", dx, " dy=", dy);
                const newX = x + dx;
                const newY = y + dy;

                // 맨 위줄일 경우 위쪽을 검사할 필요 없음
                if (x === 1 && dx === -1) continue;
                
                // 맨 아래줄일 경우 아래쪽을 검사할 필요 없음
                if (x === boardSize - 2 && dx === 1) continue;
                
                // 맨 왼쪽줄일 경우 왼쪽을 검사할 필요 없음
                if (y === 1 && dy === -1) continue;
                
                // 맨 오른쪽줄일 경우 오른쪽을 검사할 필요 없음
                if (y === boardSize - 2 && dy === 1) continue;

                // 보드 경계를 벗어나거나 빈 공간이 있으면 그룹이 둘러싸이지 않음
                if (newX <= 0 || newX >= boardSize || newY <= 0 || newY >= boardSize || board[newX][newY] === null) {
                    return false;
                }
            }
        }

        return true;
    }

    // 포위된 그룹의 돌을 제거하는 함수
    function removeGroup(group) {
        for (let { x, y } of group) {
            board[x][y] = null; // 그룹의 돌을 제거
        }
    }

    // 리셋 버튼 클릭 시 바둑판 초기화
    function resetBoard() {
        // @ts-ignore
        board = Array(boardSize).fill().map(() => Array(boardSize).fill(null)); // 모든 셀을 null로 초기화
        setAlternateMode
        // @ts-ignore
        moveHistory = Array(boardSize).fill().map(() => Array(boardSize).fill(null));
        moveCount = 0;
    }

    // 버튼 클릭 시 상태 변경
    function setWhiteMode() {
        currentMode = 'white'; // 흰색 돌만 놓기 모드로 전환
        currentStone = 'white';
    }

    function setBlackMode() {
        currentMode = 'black'; // 검정 돌만 놓기 모드로 전환
        currentStone = 'black';
    }

    function setAlternateMode() {
        currentMode = 'alternate'; // 번갈아 가며 놓기 모드로 전환
    }

    // 기보를 JSON 형식으로 저장하는 함수
    function saveKibo() {
        // 사용자에게 파일 이름을 입력받음
        let fileName = prompt("파일 이름을 입력하세요:", "kibo.json");

        // 파일 이름이 없으면 기본값 설정
        if (!fileName) {
            fileName = "kibo.json";
        }

        // 기보 데이터를 JSON 형식으로 저장
        const kibo = {
            board: board,           // 바둑판 상태
            history: history,       // 히스토리 (돌이 놓인 순서)
            moveHistory: moveHistory, // 각 돌이 놓인 순서 기록
            moveCount: moveCount    // 현재까지 놓은 돌의 수
        };

        // JSON 문자열로 변환
        const kiboJSON = JSON.stringify(kibo);

        // 파일 다운로드
        const blob = new Blob([kiboJSON], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;  // 사용자 정의 파일 이름으로 저장
        a.click();
        URL.revokeObjectURL(url);
    }

    // 기보를 불러오는 함수
    function loadKibo(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const kibo = JSON.parse(e.target.result);

            // 바둑판 상태 복원
            board = kibo.board;
            history = kibo.history;
            moveHistory = kibo.moveHistory;
            moveCount = kibo.moveCount;

            // 바둑판에 돌을 다시 그려줌 (예: 화면 갱신을 위한 함수 호출 필요)
            redrawBoard();
        };

        reader.readAsText(file);
    }

    // 바둑판을 다시 그리는 함수 (필요한 경우 구현)
    function redrawBoard() {
        // 바둑판 상태에 따라 돌들을 다시 렌더링하는 로직을 구현
        // 바둑판의 상태를 기반으로 각 돌을 그려줌
    }

</script>

<style>
    .board-container {
        display: flex;
        flex-direction: row; /* 가로로 배치 */
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh; /* 화면 전체 높이를 사용하여 컨테이너 확장 */
        margin: 0; /* 상단 여백을 없앰 */
        background-color: #d3d3d3; /* 회색 배경색 설정 */
    }

    .board {
        position: relative;
        width: 1200px; /* 바둑판 너비 1200px로 확장 */
        height: 1200px; /* 바둑판 높이 1200px로 확장 */
        background-color: #f0d9b5;
        border: 2px solid black;
        display: grid;
        grid-template-columns: repeat(19, 1fr);
        grid-template-rows: repeat(19, 1fr);
        gap: 0;
    }


    .line {
        position: absolute;
        background-color: black;
    }

    .horizontal {
        height: 2px;
        width: 100%;
    }

    .vertical {
        width: 2px;
        height: 100%;
    }

    .cell {
        position: absolute;
        width: 47px;
        height: 47px;
    }

    .star-point {
        position: absolute;
        width: 12px;
        height: 12px;
        background-color: black;
        border-radius: 50%;
        top: 53%;
        left: 53%;
        transform: translate(-50%, -50%);
    }

    .stone {
        position: absolute;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        color: white;
        font-weight: bold;
    }

    .black {
        background-color: black;
        color: white; /* 흑돌 위 숫자는 흰색 */
    }

    .white {
        background-color: white;
        color: black; /* 백돌 위 숫자는 검정색 */
    }

    .move-number {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
    }


    /* 버튼 스타일 */
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

<!-- Go board -->
<div class="board-container"> 

    <!-- Go board -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="board" on:contextmenu={undoMove}>
        <!-- Draw horizontal lines -->
        {#each Array(19) as _, index}
            <div class="line horizontal" style="top: {index * (1200 / 18)}px"></div>
        {/each}

        <!-- Draw vertical lines -->
        {#each Array(19) as _, index}
            <div class="line vertical" style="left: {index * (1200 / 18)}px"></div>
        {/each}

        <!-- Place and remove stones and render star points -->
        {#each board.slice(1, 20) as row, x}
            {#each row.slice(1, 20) as cell, y}
                <div 
                    class="cell" 
                    style="top: {x * (1200 / 18) - 25}px; left: {y * (1200 / 18) - 25}px;"
                    on:click={() => placeStone(x + 1, y + 1)} 
                    on:keydown={(e) => { if (e.key === 'Enter') placeStone(x + 1, y + 1); }}
                    role="button" tabindex="0"
                >                    
                    <!-- Render star point if the coordinates match -->
                    {#if starPoints.some(point => point.x === x + 1 && point.y === y + 1)}
                        <div class="star-point"></div>
                    {/if}

                    <!-- Render stone if present -->
                    {#if board[x + 1][y + 1] === 'black'}
                        <div class="stone black"></div>
                    {:else if board[x + 1][y + 1] === 'white'}
                        <div class="stone white"></div>
                    {/if}

                    {#if board[x + 1][y + 1] === 'black' || board[x + 1][y + 1] === 'white'}
                        <div class="stone {board[x + 1][y + 1]}">
                            {#if showMoveNumbers}
                                <span class="move-number">{moveHistory[x + 1][y + 1]}</span>
                            {/if}
                        </div>
                    {/if}
                </div>
            {/each}
        {/each}
    </div>

     <!-- Control Buttons -->
    <div class="controls">
        <!-- 흰색 돌 버튼 -->
        <button 
            class="button white-button"
            class:selected={currentMode === 'white'}
            on:click={setWhiteMode}
        ></button>

        <!-- 검정색 돌 버튼 -->
        <button 
            class="button black-button"
            class:selected={currentMode === 'black'}
            on:click={setBlackMode}
        ></button>

        <!-- 번갈아 가며 두기 버튼 -->
        <button 
            class="button alternate-button"
            class:selected={currentMode === 'alternate'}
            on:click={setAlternateMode}
        ></button>

        <!-- 옵션 버튼 -->
        <button class="button number-button"
            on:click={toggleMoveNumbers}>            
                {#if showMoveNumbers}
                    순서숨기기
                {:else}
                    순서보이기
                {/if}
        </button>

        <!-- 리셋 버튼 추가 -->
        <button 
            class="button number-button"
            on:click={resetBoard}
            style = "background-color: red;"
        >리셋</button>

        <div class="kibo-container">
            <button class="kibo-button save" on:click={saveKibo}>기보 저장</button>
            
            <label for="kibo-file" class="kibo-button load">기보 불러오기</label>
            <input type="file" id="kibo-file" class="file-input" on:change={loadKibo} />
        </div>
    </div>

    
</div>