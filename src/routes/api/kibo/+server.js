import { promises as fs } from 'fs';
import path from 'path';

// 서버의 static/kibo 폴더 경로 설정
const kiboDirectory = path.resolve('static/kibo');

export async function GET() {
    try {
        // kibo 폴더 내의 파일 목록을 가져옴
        const files = await fs.readdir(kiboDirectory);

        // .json 확장자를 가진 파일만 필터링
        const jsonFiles = files.filter(file => file.endsWith('.json') && file !== 'files.json');

        return new Response(JSON.stringify(jsonFiles), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error fetching kibo files:', error);
        return new Response(JSON.stringify({ error: 'Failed to load files' }), { status: 500 });
    }
}