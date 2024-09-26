<script>
    import GoBoard from './components/GoBoard.svelte';
    import ControlButtons from './components/ControlButtons.svelte';
    import { starPoints } from './constants';
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
  
  <div class="container">
    <div class="board-container">
      <GoBoard {starPoints} />
      <ControlButtons />
    </div>
  </div>
  
  <style>
    .container {
      display: flex;
      justify-content: center;
      align-items: flex-start; /* 컨트롤 버튼이 상단과 맞도록 설정 */
      height: 100vh;
      background-color: #d3d3d3; /* 배경색을 약간 회색으로 설정 */
    }
  
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
</style>