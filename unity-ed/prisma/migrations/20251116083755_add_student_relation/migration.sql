/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `students` table without a default value. This is not possible if the table is not empty.
  - Made the column `class_id` on table `students` required. This step will fail if there are existing NULL values in that column.
  - Made the column `school_id` on table `students` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teacher_id` on table `students` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `students` DROP FOREIGN KEY `students_ibfk_2`;

-- DropForeignKey
ALTER TABLE `students` DROP FOREIGN KEY `students_ibfk_3`;

-- DropForeignKey
ALTER TABLE `students` DROP FOREIGN KEY `students_ibfk_4`;

-- AlterTable
ALTER TABLE `students` ADD COLUMN `user_id` INTEGER NOT NULL,
    MODIFY `class_id` INTEGER NOT NULL,
    MODIFY `school_id` INTEGER NOT NULL,
    MODIFY `teacher_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `students_user_id_key` ON `students`(`user_id`);

-- CreateIndex
CREATE INDEX `userId` ON `students`(`user_id`);

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_ibfk_3` FOREIGN KEY (`school_id`) REFERENCES `schools`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_ibfk_4` FOREIGN KEY (`teacher_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_ibfk_5` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
