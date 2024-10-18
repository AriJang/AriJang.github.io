<script>
  import { board, moveHistoryStack, showMoveNumbers, placeStone, undoMove, isTryModeActive, tryMoveHistoryStack, undoTryMove, tryHistory } from '../stores/goStore';
  import { starPoints } from '../constants';
  import { onMount } from 'svelte';

  let boardSize = 1200; // 기본 셀 크기 (px 단위)
  let cellSize = boardSize / 18;

  onMount(() => {
    // 미디어 쿼리를 사용하여 화면 크기에 따른 반응형 처리
    const smallScreenQuery = window.matchMedia('(max-width: 830px), (max-height: 900px)');
    const mediumScreenQuery = window.matchMedia('(max-width: 1250px), (max-height: 1300px)');

    function updateCellSize() {
        if (smallScreenQuery.matches) {
            console.log('GoBoard small boardSize = 600');
            boardSize = 600;
        } else if (mediumScreenQuery.matches) {
            console.log('GoBoard medium boardSize = 800');
            boardSize = 800;
        } else {
            console.log('GoBoard large boardSize = 1200');
            boardSize = 1200;
        }
        cellSize = boardSize / 18;
        console.log('cellSize = ', cellSize);
    }
    

    // 미디어 쿼리 상태에 따라 셀 크기 업데이트
    updateCellSize();
    smallScreenQuery.addEventListener('change', updateCellSize);
    mediumScreenQuery.addEventListener('change', updateCellSize);
  });

  function handleUndo(event) {
    event.preventDefault();
    if ($isTryModeActive) {
      undoTryMove(); 
    } else {
      undoMove(); 
    }
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="board" on:contextmenu={handleUndo}>
    {#each Array(19) as _, index}
        <div class="line horizontal" style="top: {index * cellSize}px"></div>
    {/each}
    {#each Array(19) as _, index}
        <div class="line vertical" style="left: {index * cellSize}px"></div>
    {/each}
    {#each $board.slice(1, 20) as row, x}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        {#each row.slice(1, 20) as cell, y}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="cell" 
                style="top: {x * cellSize - cellSize / 2}px; left: {y * cellSize - cellSize / 2}px;" 
                on:click={() => {placeStone(x + 1, y + 1);}}
                on:keydown={(e) => { if (e.key === 'Enter') placeStone(x + 1, y + 1); }}
                role="button" tabindex="0">
                {#if starPoints.some(point => point.x === x + 1 && point.y === y + 1)}
                    <div class="star-point"></div>
                {/if}

                <!-- Render stone if present -->
                {#if $board[x + 1][y + 1] === 'black'}
                    <div class="stone black"></div>
                {:else if $board[x + 1][y + 1] === 'white'}
                    <div class="stone white"></div>
                {/if}


                {#if $board[x + 1][y + 1] === 'black' || $board[x + 1][y + 1] === 'white'}
                    <div class="stone {$board[x + 1][y + 1]}">
                        {#if $isTryModeActive}
                            {#if $tryHistory.find(h => h.x === x + 1 && h.y === y + 1 && h.isTryModeMove)}
                                <!-- 놓아보기 모드에서 새롭게 착수된 수만 표시 -->
                                <span class="move-number">
                                    {$tryMoveHistoryStack[x + 1][y + 1][$tryMoveHistoryStack[x + 1][y + 1].length - 1]}
                                </span>
                            {/if}
                        {:else}
                            {#if $showMoveNumbers}
                                <!-- 스택에서 가장 최근의 순서를 표시 -->
                                {#if $moveHistoryStack[x + 1][y + 1].length > 0}
                                    <span class="move-number">
                                        {$moveHistoryStack[x + 1][y + 1][$moveHistoryStack[x + 1][y + 1].length - 1]}
                                    </span>
                                {/if}
                            {/if}
                        {/if}
                    </div>
                {/if}
            </div>
        {/each}
    {/each}
</div>

<style>
    .board {
        position: relative;
        width: 1200px;
        height: 1200px;
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
        width: 16px;
        height: 16px;
        background-color: black;
        border-radius: 50%;
        top: 55%;
        left: 55%;
    }

    .stone {
        position: absolute;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        top: 10%;
        left: 10%;
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

    @media screen and (max-width: 1250px), screen and (max-height: 1300px) {
        .board {
            width: 800px;
            height: 800px;
        }

        .cell {
            width: 42px;
            height: 42px;
        }

        .stone {
            width: 38px;
            height: 38px;
        }

        .star-point {
            width: 12px;
            height: 12px;
            top: 40%;
            left: 40%;
        }
    }

    @media screen and (max-width: 830px), screen and (max-height: 900px) {
        .board {
            width: 600px;
            height: 600px;
        }

        .cell {
            width: 32px;
            height: 32px;
        }

        .stone {
            width: 28px;
            height: 28px;
        }

        .star-point {
            width: 10px;
            height: 10px;
            top: 40%;
            left: 40%;
        }
    }

</style>
