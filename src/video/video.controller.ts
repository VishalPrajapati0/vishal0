// video.controller.ts

import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from './video.entity';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  async create(@Body() videoData: Video): Promise<Video> {
    return this.videoService.create(videoData);
  }

  @Get()
  async findAll(): Promise<Video[]> {
    return this.videoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Video> {
    return this.videoService.findOne(parseInt(id, 10));
  }


  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.videoService.remove(parseInt(id, 10));
  }
}
