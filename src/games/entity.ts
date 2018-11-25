import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsJSON } from 'class-validator'

export type Color = 'red'| 'blue'| 'green' | 'yellow' | 'magenta'


@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text', { nullable: false })
  name: string

  @IsString()
  
  @Column('text', { nullable: false })
  color: Color

  @IsJSON()
  @Column('json', { nullable: false })
  board:  Array<Array<string>>

} 
