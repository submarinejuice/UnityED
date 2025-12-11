/*
  Warnings:

  - You are about to drop the column `teacher_name` on the `classes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `classes` DROP COLUMN `teacher_name`,
    ADD COLUMN `teacher_id` INTEGER NULL;

-- CreateIndex
CREATE INDEX `teacher_id` ON `classes`(`teacher_id`);

-- AddForeignKey
ALTER TABLE `classes` ADD CONSTRAINT `classes_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
