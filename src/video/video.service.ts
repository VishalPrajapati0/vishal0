
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Video } from './video.entity';

// @Injectable()
// export class VideoService {
//   constructor(
//     @InjectRepository(Video)
//     private videoRepository: Repository<Video>,
//   ) {}

//   findAll(): Promise<Video[]> {
//     return this.videoRepository.find();
//   }

//   findOne(id: number): Promise<Video> {
//     return this.videoRepository.findOneBy({ id });
//   }

//   create(video: Video): Promise<Video> {
//     return this.videoRepository.save(video);
//   }

//   async remove(id: number): Promise<void> {
//     await this.videoRepository.delete(id);
//   }
// }



import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './video.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
  ) {}

  findAll(): Promise<Video[]> {
    return this.videoRepository.find();
  }

  findOne(id: number): Promise<Video> {
    return this.videoRepository.findOneBy({ id });
  }

  create(video: Video): Promise<Video> {
    return this.videoRepository.save(video);
  }

  async remove(id: number): Promise<void> {
    await this.videoRepository.delete(id);
  }

  async updateSelectedLayout(id: number, selectedLayout: string): Promise<Video> {
    const video = await this.videoRepository.findOneBy({ id });
    video.selectedLayout = selectedLayout;
    return this.videoRepository.save(video);
  }
}
//
