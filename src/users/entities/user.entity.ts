import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
  
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
  
    @Column({ type: 'varchar', nullable: true })
    image?: string;
  
    @Column({ nullable: true})
    name?: string;
  
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

    @Column()
    password: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    lastLoginAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
      if (this.password) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
      }
    }

    async validatePassword(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
    }
  }
  