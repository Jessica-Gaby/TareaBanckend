import { Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from 'src/shared/enums';
import { SongEntity } from '../songs/entities/song.model';
import { FindOptions, FindOptionsWhere, Repository } from 'typeorm';
import { FilterSongsDto } from '../songs/dto/filter.songs.dto';
import { CreateSongsDto } from '../songs/dto/create.songs.dto';
import { UpdateSongsDto } from '../songs/dto/update.songs.dto';
import { ReadSongsDto } from '../songs/dto/read.songs.dto';
import { PaginationDto } from '../pagination.dto';
import { NotFoundError } from 'rxjs';
import { response } from 'express';
import { ServiceResponseHttpModel } from 'src/shared/models/service-response-http.models';

@Injectable()
export class VentasService {
    constructor(
        @Inject(RepositoryEnum.SONG_REPOSITORY)
        private repository: Repository<SongEntity>
    )
    async create(payload: CreateSongsDto):Promise<ServiceResponseHttpModel> {  //payload enviando un paramtro de tipo dto
        const newSong = this.repository.create(payload);
        const songCreated = await this.repository.save(newSong);  // await sigifica esperar

        return { data: plainToInstance(ReadSongsDto, songCreated) }
    }
    async catalogue() :Promise<ServiceResponseHttpModel> {
        const response = this.repository.findAndCount({ take: 1000 });
        return {
            data: response[0],
            pagination: { totalItems: response[1], limit: 10 }
        };
    }

    async finAll(params?: FilterSongsDto):Promise<ServiceResponseHttpModel>{        //retorna todos los datos o todos los filtrado
        if (params?.limit > 0 && params?.page >= 0) {
            return await this.paginateAndFilter(params);
        }
        const response = await this.repository.findAndCount({
            order: { updateAt: 'DESC' },   //COMO SE DESE VISUALIZAR LA DATA
        });
        return {
            data: plainToInstance(ReadSongsDto, response[0]),
            pagination: { totalItems: response[1], limit: 10 },
        }
    }

    async finOne(id: string):Promise<ServiceResponseHttpModel> {        //retorna solo un ojeto
        const response = await this.repository.findOne({
            where: { id },
        });
        if (response) {
            throw new NotFoundException('La cancion no ha sido encontrada');
        }
        return {data: plainToInstance(ReadSongsDto, response)};
    }
    async update(id: string, payload: UpdateSongsDto) :Promise<ServiceResponseHttpModel> {
        const response = await this.repository.findOneBy({ id });
        if (!response) {
            throw new NotFoundException('La cancion no ha sido encontrada');
        }
        this.repository.merge(response, payload);
        this.repository.save(response);
        return {data: plainToInstance(UpdateSongsDto, response)};
    }
    async remove(id: string) :Promise<ServiceResponseHttpModel> {
        const response = await this.repository.findOneBy({ id });
        if (!response) {
            throw new NotFoundException('La cancion no ha sido encontrada');
        }
        this.repository.softRemove(response);
        return {data: plainToInstance(ReadSongsDto, response)};
    }
    async removeAll(payload: SongEntity[]) :Promise<ServiceResponseHttpModel>{
        const response = await this.repository.softRemove( payload);
        return {data : response};
    }

    private async PaginateAndFilter(params: FilterSongsDto):Promise<ServiceResponseHttpModel>{
        let where:
            FindOptionsWhere<SongEntity>
            FindOptionsWhere <SongEntity>[];
        where = {};
        let { page, search } = params;
        const {limit } = params;
        if (search){
            search = search.trim(),
            page = 0;
            where = [];
            //where.push({name: Ilike ('%${search}')})
        }
        const data = this.repository.findAndCount({
            relations: ['bloodType', 'gender'],
            where,
            take: limit,
            skip: PaginationDto.getOffset(limit,page),
        });
        return {pagination: {limit, totalItems:data[1]}, data: data[0]};
    }

}