<script>
  import { board, moveHistoryStack, showMoveNumbers, placeStone, undoMove } from '../stores/goStore';
  export let starPoints;

  function handleUndo(event) {
    event.preventDefault(); // 우클릭 시 기본 메뉴 방지
    undoMove();
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="board" on:contextmenu={handleUndo}>
    {#each Array(19) as _, index}
        <div class="line horizontal" style="top: {index * (1200 / 18)}px"></div>
    {/each}
    {#each Array(19) as _, index}
        <div class="line vertical" style="left: {index * (1200 / 18)}px"></div>
    {/each}
    {#each $board.slice(1, 20) as row, x}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        {#each row.slice(1, 20) as cell, y}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="cell" 
                 style="top: {x * (1200 / 18) - 25}px; left: {y * (1200 / 18) - 25}px;" 
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
                        {#if $showMoveNumbers}
                            <!-- 스택에서 가장 최근의 순서를 표시 -->
                            {#if $moveHistoryStack[x + 1][y + 1].length > 0}
                                <span class="move-number">
                                    {$moveHistoryStack[x + 1][y + 1][$moveHistoryStack[x + 1][y + 1].length - 1]}
                                </span>
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

</style>
