<script>
    import GoBoard from './components/GoBoard.svelte';
    import OptionButtons from './components/OptionButtons.svelte';
    import ControlButtons from './components/ControlButtons.svelte';
    import { onMount } from 'svelte';
    import { fetchKiboFilesOnRuntime, fetchKiboFilesFromBuild} from './stores/goStore';

    onMount(async () => {
        console.log('import.meta.env.DEV = ' , import.meta.env.DEV);

        if (import.meta.env.DEV) { // 동적 빌드일 때만 API 호출
            fetchKiboFilesOnRuntime();
        } else { // 정적 빌드
            fetchKiboFilesFromBuild();
        }

        
    });

</script>
  
<style>
    
    .container {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        height: 100vh;
        width: 100vw;
        background-color: #bcb3b3;
        gap: 20px;
        padding: 0 20px;  /* 좌우 여백 추가 */
    }

    .board-side-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;  /* 컨테이너가 축소되지 않도록 설정 */
        width: fit-content;  /* 컨텐츠 크기만큼만 너비 차지 */
    }

    .board-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 0 0 1200px;
        margin-right: 20px;
    }

    .media-buttons-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin-top: 20px;
        width: 100%; 
    }

    @media screen and (max-width: 1250px), screen and (max-height: 1300px) {
        .board-container {
            flex: 0 0 800px; 
            margin-right: 0;
            margin-bottom: 20px;
        }
    }

    @media screen and (max-width: 830px), screen and (max-height: 900px) {
        .container {
            align-items: flex-start;
            padding: 10px;
        }

        .board-container {
            flex: 0 0 600px; 
        }

        .media-buttons-container {
            gap: 5px;
            margin-top: 10px;
    }

}
</style>

<div class="container">
    <!-- 바둑판과 바둑판 아래의 버튼들을 묶은 컨테이너 -->
    <div class="board-side-container">
      <!-- 바둑판 컴포넌트 -->
      <div class="board-container">
        <GoBoard />
      </div>
  
      <!-- 바둑판 아래의 컨트롤 버튼들 -->
      <div class="media-buttons-container">
        <ControlButtons />
      </div>
    </div>

    <!-- 바둑판 오른쪽에 위치할 옵션 버튼 그룹 -->
    <OptionButtons />
</div>