import { writable, get } from 'svelte/store';

// 바둑판 상태 초기화
const boardSize = 21;
const initialBoard = Array(boardSize).fill().map(() => Array(boardSize).fill(null));
const initialMoveHistoryStack = Array(boardSize).fill().map(() => Array(boardSize).fill().map(() => []));  // 각 자리에 스택으로 순서 기록

// 스토어 생성
export const board = writable(initialBoard);
export const currentMode = writable('alternate');  // 번갈아 가며 놓기 모드
export const currentStone = writable('black');  // 첫 돌은 검정색
export const moveHistoryStack = writable(initialMoveHistoryStack);
export const gMoveCount = writable(0);  // 현재 돌 순서
export const history = writable([]);  // 모든 돌의 히스토리를 기록할 배열
export const redoStack = writable([]);  // 되돌린 수를 임시로 저장하는 스택
export const showMoveNumbers = writable(true);  // 숫자 표시 여부
export const kiboFiles = writable([]);  // 기보 파일 목록

/** 착수 관련 로직 */

// 착수 함수
export function placeStone(x, y) {
    console.log('playStone x=',x,' y=',y);
    board.update(b => {
        console.log('b[x][y] = ',b[x][y]);
        if (b[x][y] === null) {
            // 현재 돌을 놓음
            b[x][y] = get(currentStone);
            
            gMoveCount.update(n => n + 1);  // 순서 증가
            
            // 해당 자리에 스택에 순서 기록
            moveHistoryStack.update(mhs => {
                mhs[x][y].push(get(gMoveCount));
                return mhs;
            });
            
            const capturedStones = checkCaptured(x, y, b);  // 포위된 돌이 있는지 체크

            // 히스토리에 돌의 위치, 색상, 포위된 돌 기록
            history.update(h => [...h, { x, y, stone: get(currentStone), capturedStones, moveCount: get(gMoveCount) }]);

            // 앞으로 가기 스택을 비움
            redoStack.set([]);

            // 다음 차례로 돌 교체
            if (get(currentMode) === 'alternate') {
                currentStone.set(get(currentStone) === 'black' ? 'white' : 'black');
            }
        } else {
            // 이미 돌이 놓인 자리에 다시 클릭하면 돌을 제거
            b[x][y] = null;
            moveHistoryStack.update(mhs => {
                mhs[x][y].pop();  // 스택에서 제거
                return mhs;
            });
        }
        return b;
    });
}

// 되돌리기 기능
export function undoMove() {
    if (get(history).length > 0) {
        const lastMove = get(history).pop();  // 마지막 수를 제거
        redoStack.update(r => [...r, lastMove]);  // 되돌린 수를 redoStack에 저장
        const { x, y, capturedStones } = lastMove;

        board.update(b => {
            b[x][y] = null;  // 돌을 제거

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

// 앞으로 가기 기능 (되돌린 수 복원)
export function redoMove() {
    if (get(redoStack).length > 0) {
        const nextMove = get(redoStack).pop();  // 되돌린 수를 다시 가져옴
        const { x, y, stone, moveCount } = nextMove;

        board.update(b => {
            b[x][y] = stone;  // 돌을 복원

            // 해당 자리에 스택에 순서 복원
            moveHistoryStack.update(mhs => {
                mhs[x][y].push(moveCount);
                return mhs;
            });

            const capturedStones = checkCaptured(x, y, b);  // 포위된 돌 확인

            history.update(h => [...h, { x, y, stone, capturedStones, moveCount }]);

            return b;
        });

        // 차례를 교체
        currentStone.set(stone === 'black' ? 'white' : 'black');
        gMoveCount.update(n => n + 1);
    }
}

// 포위된 돌이 있는지 확인하는 함수
function checkCaptured(x, y, board) {
    const opponent = get(currentStone) === 'black' ? 'white' : 'black';  // 상대방 돌 색상
    const directions = [
        { dx: -1, dy: 0 },  // 위쪽
        { dx: 1, dy: 0 },   // 아래쪽
        { dx: 0, dy: -1 },  // 왼쪽
        { dx: 0, dy: 1 }    // 오른쪽
    ];

    const capturedStones = [];  // 포위된 돌들

    // 상하좌우에 있는 상대방 돌을 확인
    for (let { dx, dy } of directions) {
        const newX = x + dx;
        const newY = y + dy;

        // 보드 경계 안에 있고 상대방 돌이 있는 경우
        if (newX > 0 && newX < boardSize && newY > 0 && newY < boardSize && board[newX][newY] === opponent) {
            const group = findGroup(newX, newY, opponent, board);  // 그룹을 찾음
            if (isSurrounded(group, board)) {
                capturedStones.push(...group);  // 포위된 그룹을 기록
                removeGroup(group, board);  // 그룹 제거
            }
        }
    }

    return capturedStones;  // 포위된 돌 그룹 반환
}

// 그룹을 찾는 함수 (재귀적으로 연결된 같은 색 돌을 찾음)
function findGroup(x, y, stoneType, board, visited = new Set()) {
    const group = [];
    const stack = [{ x, y }];
    visited.add(`${x},${y}`);

    const directions = [
        { dx: -1, dy: 0 },  // 위쪽
        { dx: 1, dy: 0 },   // 아래쪽
        { dx: 0, dy: -1 },  // 왼쪽
        { dx: 0, dy: 1 }    // 오른쪽
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
        { dx: -1, dy: 0 },  // 위쪽
        { dx: 1, dy: 0 },   // 아래쪽
        { dx: 0, dy: -1 },  // 왼쪽
        { dx: 0, dy: 1 }    // 오른쪽
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


/** 컨트롤 버튼 관련 로직 */

// 바둑판 리셋 함수
export function resetBoard() {
    board.set(Array(boardSize).fill().map(() => Array(boardSize).fill(null)));
    moveHistoryStack.set(Array(boardSize).fill().map(() => Array(boardSize).fill().map(() => [])));
    gMoveCount.set(0);
    history.set([]);
    redoStack.set([]);
    currentStone.set('black');
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
export function loadKiboFromLocal(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const kiboData = JSON.parse(e.target.result);
        applyKiboData(kiboData);
    };
    reader.readAsText(file);
}

// 기보 데이터를 바둑판에 적용하는 함수
function applyKiboData(kibo) {
    board.set(kibo.board || initialBoard);
    history.set(kibo.history || []);
    moveHistoryStack.set(kibo.moveHistoryStack || initialMoveHistoryStack);
    gMoveCount.set(kibo.moveCount || 0);
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

// 기보를 정적 자산에서 불러오는 함수 (사용자가 드롭다운에서 선택한 기보를 불러옴)
export async function loadKiboFromAssets(filePath) {
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