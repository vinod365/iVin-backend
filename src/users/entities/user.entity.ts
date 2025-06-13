import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  export enum Role {
    ADMIN = 'admin',
    DEALER = 'dealer',
  }
  
  export enum Status {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
  }
  
  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'string', nullable: true })
    image: string;
  
    @Column({ nullable: true})
    name: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column({
        nullable:true
    })
    phone?: string;
  
    @Column({
      type: 'enum',
      enum: Role,
      default: Role.DEALER,
    })
    role: Role;
  
    @Column({
      type: 'enum',
      enum: Status,
      default: Status.ACTIVE,
    })
    status: Status;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  