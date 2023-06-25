/* eslint-disable prettier/prettier */
import {PrimaryGeneratedColumn,Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column, ManyToOne } from "typeorm";
import { AuthorEntity} from "../../author/entities/author.model";

@Entity ('songs', { schema: 'ventas' })

export class SongEntity {
    @PrimaryGeneratedColumn('uuid')  //uuid es para indicar que el id es el primarykey
        id: string;
    

    @ManyToOne(() => AuthorEntity, author => author.songs)
  authors: AuthorEntity [];

    @Column( 'varchar',{
        name:'title',
        nullable:false,
        comment:'Nombre de la cancion',
       
    })
    titleAT: string;
    
    @Column('integer',{
        name: 'releaseyear',
        nullable:false,
        comment: 'Año de lanzamiento de la cancion',
    })
    releaseyearAT:number;
    
    @Column ('varchar',{
        name:'gender',
        nullable:true,
        comment: 'Genero de la cancion',
    })
    genderAT:string;

}