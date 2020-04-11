import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1586141531590 implements MigrationInterface {
    name = 'createTables1586141531590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `seat_condition` (`id` int NOT NULL AUTO_INCREMENT, `status` enum ('UNAVAILABLE', 'UNCOMFORTABLE', 'UNSANITARY') NOT NULL, `description` varchar(255) NOT NULL, `seatId` int NULL DEFAULT NULL, UNIQUE INDEX `REL_ab8dc2bb045571de4e39a3a2d9` (`seatId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `seat` (`id` int NOT NULL AUTO_INCREMENT, `seatNumber` varchar(255) NOT NULL, `seatPassword` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `order` (`id` int NOT NULL AUTO_INCREMENT, `password` varchar(255) NOT NULL, `startAt` datetime NOT NULL, `endAt` datetime NOT NULL, `seatId` int NULL DEFAULT NULL, UNIQUE INDEX `REL_e8e372c3bfa9f3dde83e1a9085` (`seatId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `seat_condition` ADD CONSTRAINT `FK_ab8dc2bb045571de4e39a3a2d97` FOREIGN KEY (`seatId`) REFERENCES `seat`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_e8e372c3bfa9f3dde83e1a90853` FOREIGN KEY (`seatId`) REFERENCES `seat`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_e8e372c3bfa9f3dde83e1a90853`", undefined);
        await queryRunner.query("ALTER TABLE `seat_condition` DROP FOREIGN KEY `FK_ab8dc2bb045571de4e39a3a2d97`", undefined);
        await queryRunner.query("DROP INDEX `REL_e8e372c3bfa9f3dde83e1a9085` ON `order`", undefined);
        await queryRunner.query("DROP TABLE `order`", undefined);
        await queryRunner.query("DROP TABLE `seat`", undefined);
        await queryRunner.query("DROP INDEX `REL_ab8dc2bb045571de4e39a3a2d9` ON `seat_condition`", undefined);
        await queryRunner.query("DROP TABLE `seat_condition`", undefined);
    }

}
