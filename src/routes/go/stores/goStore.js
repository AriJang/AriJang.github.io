import { writable, get } from 'svelte/store';

// 바둑판 상태 초기화
const boardSize = 21;
const initialBoard = Array(boardSize).fill().map(() => Array(boardSize).fill(null));
const initialMoveHistoryStack = Array(boardSize).fill().map(() => Array(boardSize).fill().map(() => []));

// 스토어 생성
export const board = writable(initialBoard);
export const currentMode = writable('alternate');
export const currentStone = writable('black'); 
export const moveHistoryStack = writable(initialMoveHistoryStack);
export const gMoveCount = writable(0); 
export const history = writable([]); 
export const redoStack = writable([]); 
export const showMoveNumbers = writable(true);

export const kiboFiles = writable([]);
export const isKiboLoaded = writable(false); 
export const isTryModeActive = writable(false); 
export const tryHistory = writable([]); 
export const tryMoveHistoryStack = writable([]);
export const tryMoveCount = writable(0);


/** 착수 관련 로직 */

function redrawBoard() {
    const currentHistory = get(history);
    board.update(b => {
        // 보드 초기화
        for (let x = 0; x < boardSize; x++) {
            for (let y = 0; y < boardSize; y++) {
                b[x][y] = null;
            }
        }
        // 히스토리에서 돌을 하나씩 복원
        currentHistory.forEach(({ x, y, stone }) => {
            b[x][y] = stone;
        });
        return b;
    });
}

// 착수 함수
export function placeStone(x, y) {
    if (get(isKiboLoaded) && !get(isTryModeActive)) {
        alert("놓아보기 모드를 활성화해야 착수할 수 있습니다.");
        return;
    }

    board.update(b => {
        if (get(isTryModeActive)) {
            if (b[x][y] === null) {
                b[x][y] = get(currentStone);

                const moveCount = get(tryMoveCount) + 1;
                const capturedStones = checkCaptured(x, y, b);

                tryHistory.update(th => [
                    ...th, 
                    { x, y, stone: get(currentStone), capturedStones, moveCount, isTryModeMove: true }
                ]);

                tryMoveHistoryStack.update(mhs => {
                    mhs[x][y].push(moveCount);
                    return mhs;
                });

                tryMoveCount.set(moveCount);

                currentStone.set(get(currentStone) === 'black' ? 'white' : 'black');
            }
        } else {
            if (b[x][y] === null) {
                b[x][y] = get(currentStone);
                
                gMoveCount.update(n => n + 1);

                moveHistoryStack.update(mhs => {
                    mhs[x][y].push(get(gMoveCount));
                    return mhs;
                });
                
                const capturedStones = checkCaptured(x, y, b); 
                history.update(h => [...h, { x, y, stone: get(currentStone), capturedStones, moveCount: get(gMoveCount) }]);
    
                redoStack.set([]);

                if (get(currentMode) === 'alternate') {
                    currentStone.set(get(currentStone) === 'black' ? 'white' : 'black');
                }
            } else {
                // 이미 돌이 놓인 자리에 다시 클릭하면 돌을 제거
                b[x][y] = null;
                moveHistoryStack.update(mhs => {
                    mhs[x][y].pop(); 
                    return mhs;
                });
            }
        }        
        return b;
    });
}

// 포위된 돌(사석)이 있는지 확인하는 함수
function checkCaptured(x, y, board) {
    const opponent = get(currentStone) === 'black' ? 'white' : 'black';  // 상대방 돌 색상
    const directions = [
        { dx: -1, dy: 0 },  // 위쪽
        { dx: 1, dy: 0 },   // 아래쪽
        { dx: 0, dy: -1 },  // 왼쪽
        { dx: 0, dy: 1 }    // 오른쪽
    ];

    const capturedStones = [];  

    for (let { dx, dy } of directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (newX > 0 && newX < boardSize && newY > 0 && newY < boardSize && board[newX][newY] === opponent) {
            const group = findGroup(newX, newY, opponent, board); 
            if (isSurrounded(group, board)) {
                capturedStones.push(...group); 
                removeGroup(group, board);
            }
        }
    }

    return capturedStones;
}

// 그룹을 찾는 함수 (재귀적으로 연결된 같은 색 돌을 찾음)
function findGroup(x, y, stoneType, board, visited = new Set()) {
    const group = [];
    const stack = [{ x, y }];
    visited.add(`${x},${y}`);

    const directions = [
        { dx: -1, dy: 0 }, 
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: 0, dy: 1 }
    ];

    while (stack.length > 0) {
        const { x: currentX, y: currentY } = stack.pop();
        group.push({ x: currentX, y: currentY, stone: board[currentX][currentY] });

        for (let { dx, dy } of directions) {
            const newX = currentX + dx;
            const newY = currentY + dy;

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
function isSurrounded(group, board) {
    const directions = [
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: 0, dy: 1 }
    ];

    for (let { x, y } of group) {
        for (let { dx, dy } of directions) {
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

            // 경계를 벗어나거나 빈 공간이 있으면 포위되지 않음
            if (newX <= 0 || newX >= boardSize || newY <= 0 || newY >= boardSize || board[newX][newY] === null) {
                return false;
            }
        }
    }

    return true;
}

// 포위된 그룹의 돌을 제거하는 함수
function removeGroup(group, board) {
    group.forEach(({ x, y }) => {
        board[x][y] = null;  // 돌을 제거
    });
}

// 되돌리기
export function undoMove() {
    if (get(history).length > 0) {
        const lastMove = get(history).pop();
        redoStack.update(r => [lastMove, ...r]);
        const { x, y, capturedStones } = lastMove;

        board.update(b => {
            b[x][y] = null;  // 마지막 수를 바둑판에서 제거

            // 스택에서 마지막 순서도 제거
            moveHistoryStack.update(mhs => {
                mhs[x][y].pop();
                return mhs;
            });

            // 포위된 돌 복원
            capturedStones.forEach(({ x: capturedX, y: capturedY, stone }) => {
                b[capturedX][capturedY] = stone;
            });

            return b;
        });

        // 차례를 되돌림
        currentStone.set(lastMove.stone);
        gMoveCount.update(n => n - 1);
    }
}

// 앞으로 가기(되돌린 수 복원)
export function redoMove() {
    if (get(redoStack).length > 0) {
        const nextMove = get(redoStack).shift();
        const { x, y, stone, moveCount } = nextMove;

        board.update(b => {
            b[x][y] = stone;  // 돌을 복원

            // 해당 자리에 스택에 순서 복원
            moveHistoryStack.update(mhs => {
                mhs[x][y].push(moveCount);
                return mhs;
            });

            const capturedStones = checkCaptured(x, y, b);  // 포위된 돌 확인

            history.update(h => [...h, { x, y, stone, capturedStones, moveCount }]); // 히스토리 업데이트

            return b;
        });

        currentStone.set(stone === 'black' ? 'white' : 'black');
        gMoveCount.update(n => n + 1);
    }
}

// 바둑판을 처음 상태로 되돌리는 함수
export function goToStart() {
    const currentHistory = get(history);
    redoStack.update(r => [...currentHistory,...r]);
    board.set(Array(boardSize).fill().map(() => Array(boardSize).fill(null))); 
    moveHistoryStack.set(Array(boardSize).fill().map(() => Array(boardSize).fill().map(() => [])));
    gMoveCount.set(0);
    history.set([]); 
}

// 5수 뒤로 가는 함수
export function goBackFiveMoves() {
    let steps = Math.min(5, get(history).length); 
    for (let i = 0; i < steps; i++) {
        undoMove(); 
    }
}

// 5수 앞으로 가는 함수
export function goForwardFiveMoves() {
    let steps = Math.min(5, get(redoStack).length); 
    for (let i = 0; i < steps; i++) {
        redoMove(); 
    }
}

// 마지막 수로 이동하는 함수
export function goToEnd() {
    while (get(redoStack).length > 0) {
        redoMove(); 
    }
}


export function undoTryMove() {
    if (get(isTryModeActive) && get(tryHistory).length > 0) {
        const lastMove = get(tryHistory).pop();
        board.update(b => {
            b[lastMove.x][lastMove.y] = null;
            return b;
        });

        tryMoveHistoryStack.update(mhs => {
            mhs[lastMove.x][lastMove.y].pop();
            return mhs;
        });

        // 사석 복구
        lastMove.capturedStones.forEach(({ x: capturedX, y: capturedY, stone }) => {
            board.update(b => {
                b[capturedX][capturedY] = stone; 
                return b;
            });
        });

        tryMoveCount.update(n => n - 1);
    } else {
        alert("더 이상 되돌릴 수 없습니다.");
    }
}

  export function toggleTryMode() {
    isTryModeActive.update(value => !value);
    if (get(isTryModeActive)) {
        startTryMode();
    } else {
        stopTryMode();
    }
  }

  export function startTryMode() {
    tryHistory.set([]);
    tryMoveHistoryStack.set(get(moveHistoryStack));
    isTryModeActive.set(true);
    tryMoveCount.set(0);
  }

  export function stopTryMode() {
    isTryModeActive.set(false);
    tryHistory.set([]);
    tryMoveHistoryStack.set([]);
    tryMoveCount.set(0);

    board.update(b => {
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                b[i][j] = null;
            }
        }

        get(history).forEach(move => {
            b[move.x][move.y] = move.stone;
        });

        return b;
    });

    gMoveCount.set(get(history).length);
}


/** 컨트롤 버튼 관련 로직 */

// 바둑판 리셋 함수
export function resetBoard() {
    board.set(initialBoard);
    moveHistoryStack.set(initialMoveHistoryStack);
    gMoveCount.set(0);
    history.set([]);
    redoStack.set([]);
    isKiboLoaded.set(false);
    isTryModeActive.set(false);
    tryHistory.set([]);
    tryMoveCount.set(0);
    currentStone.set('black');

    redrawBoard();
}

// 숫자 표시 여부를 토글하는 함수
export function toggleMoveNumbers() {
    showMoveNumbers.update(n => !n);
}

// 모드 설정 함수
export function setWhiteMode() {
    currentMode.set('white');
    currentStone.set('white');
}

export function setBlackMode() {
    currentMode.set('black');
    currentStone.set('black');
}

export function setAlternateMode() {
    currentMode.set('alternate');
    currentStone.set('black');
}


/** 기보 관련 로직 */

// 기보를 저장하는 함수
export function saveKibo() {
    const fileName = prompt("파일 이름을 입력하세요:", "kibo.json");

    if (!fileName) {
        return;  // 파일 이름이 없으면 취소
    }

    const kiboData = {
        board: get(board),
        history: get(history),
        moveHistoryStack: get(moveHistoryStack),
        moveCount: get(gMoveCount)
    };

    const kiboJSON = JSON.stringify(kiboData);
    const blob = new Blob([kiboJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
}

// 기보를 불러오는 함수 (로컬에서 파일 선택 후)
export function loadKiboFromLocal(event) {
    const file = event.target.files[0];
    console.log('loadKiboFromLocal', file);
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const kiboData = JSON.parse(e.target.result);
        applyKiboData(kiboData);
    };
    reader.readAsText(file);

    // 동일한 파일을 다시 선택할 수 있도록 input 값을 초기화
    event.target.value = '';  // <--- 여기서 값을 초기화
}

// 기보 데이터를 바둑판에 적용하는 함수
function applyKiboData(kibo) {
    resetBoard();
    board.set(kibo.board || initialBoard);
    history.set(kibo.history || []);
    moveHistoryStack.set(kibo.moveHistoryStack || initialMoveHistoryStack);
    gMoveCount.set(kibo.moveCount || 0);
    isKiboLoaded.set(true);
    isTryModeActive.set(false);
    tryHistory.set([]);

    restoreFromKiboData();
}

function restoreFromKiboData() {
    goToStart();
    goToEnd();
}

// 기보 파일을 정적 자산에서 불러오는 함수
export async function fetchKiboFilesFromBuild() {
    try {
        const response = await fetch('/kibo/files.json');  // 정적 자산에서 JSON 파일 목록을 가져옴
        kiboFiles.set(await response.json());
    } catch (error) {
        console.error('Error fetching kibo files:', error);
    }
}

// 기보 파일을 동적으로 서버에서 불러오는 함수
export async function fetchKiboFilesOnRuntime() {
    try {
        const response = await fetch('/api/kibo');
        kiboFiles.set(await response.json());
    } catch (error) {
        console.error('Error fetching kibo files:', error);
    }
}

export async function loadKiboFromAssets(event) {
    const filePath = event.target.value;
    console.log('loadKiboFromAssets file=', filePath);
    if (filePath) {
        try {
            const response = await fetch(`/kibo/${filePath}`);
            const data = await response.json();
            applyKiboData(data);
        } catch (error) {
            console.error("Error loading kibo file:", error);
        }
    }
}