/*
  Migration: Unified Game Schema
  
  Complete database reset and rebuild with new unified game tables.
*/

-- Drop all existing tables first to avoid foreign key conflicts
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `account`;
DROP TABLE IF EXISTS `playerprofile`;
DROP TABLE IF EXISTS `playerprogress`;
DROP TABLE IF EXISTS `playerscorespanel`;
DROP TABLE IF EXISTS `runeventslocal`;
DROP TABLE IF EXISTS `runlocal`;
DROP TABLE IF EXISTS `runtraitscoreslocal`;
DROP TABLE IF EXISTS `session`;
DROP TABLE IF EXISTS `uploadqueue`;
DROP TABLE IF EXISTS `teacher_profiles`;
DROP TABLE IF EXISTS `students`;
DROP TABLE IF EXISTS `classes`;
DROP TABLE IF EXISTS `user`;

SET FOREIGN_KEY_CHECKS = 1;

-- Create new users table
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255) NULL,
    `role` ENUM('ADMIN', 'TEACHER', 'STUDENT') NOT NULL DEFAULT 'STUDENT',
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create auth tables
CREATE TABLE `accounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `type` VARCHAR(255) NULL,
    `provider` VARCHAR(255) NULL,
    `provider_account_id` VARCHAR(255) NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(255) NULL,
    `scope` VARCHAR(255) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(255) NULL,

    INDEX `user_id`(`user_id`),
    UNIQUE INDEX `unique_provider`(`provider`, `provider_account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `sessions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sessionToken` VARCHAR(255) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `expires` DATETIME(0) NOT NULL,

    UNIQUE INDEX `session_token`(`sessionToken`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create game tables
CREATE TABLE `game_sessions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `start_time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `end_time` DATETIME(0) NULL,
    `total_score` INTEGER NULL DEFAULT 0,
    `level_reached` INTEGER NULL DEFAULT 1,
    `rewards_earned` JSON NULL,
    `device_type` ENUM('unity', 'webgl') NOT NULL DEFAULT 'unity',

    INDEX `user_id`(`user_id`),
    INDEX `start_time`(`start_time`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `scores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `total_score` INTEGER NOT NULL DEFAULT 0,
    `highest_score` INTEGER NOT NULL DEFAULT 0,
    `xp` INTEGER NOT NULL DEFAULT 0,
    `coins` INTEGER NOT NULL DEFAULT 0,
    `gems` INTEGER NOT NULL DEFAULT 0,
    `last_updated` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `scores_user_id_key`(`user_id`),
    INDEX `user_id`(`user_id`),
    INDEX `total_score`(`total_score`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `leaderboards` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `weekly_score` INTEGER NOT NULL DEFAULT 0,
    `monthly_score` INTEGER NOT NULL DEFAULT 0,
    `weekly_rank` INTEGER NULL,
    `monthly_rank` INTEGER NULL,
    `last_reset` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `leaderboards_user_id_key`(`user_id`),
    INDEX `user_id`(`user_id`),
    INDEX `weekly_score`(`weekly_score`),
    INDEX `monthly_score`(`monthly_score`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `progress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `level` INTEGER NOT NULL DEFAULT 1,
    `xp` INTEGER NOT NULL DEFAULT 0,
    `completed_lessons` JSON NULL,
    `current_streak` INTEGER NOT NULL DEFAULT 0,
    `longest_streak` INTEGER NOT NULL DEFAULT 0,
    `last_played` DATETIME(0) NULL,

    UNIQUE INDEX `progress_user_id_key`(`user_id`),
    INDEX `user_id`(`user_id`),
    INDEX `level`(`level`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `badges` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `icon` VARCHAR(255) NULL,
    `requirement` VARCHAR(255) NOT NULL,
    `category` ENUM('ACHIEVEMENT', 'PROGRESS', 'SPECIAL', 'SOCIAL') NOT NULL,

    UNIQUE INDEX `badges_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `user_badges` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `badge_id` INTEGER NOT NULL,
    `earned_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user_id`(`user_id`),
    INDEX `badge_id`(`badge_id`),
    UNIQUE INDEX `unique_user_badge`(`user_id`, `badge_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `analytics_events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `session_id` INTEGER NULL,
    `event_type` VARCHAR(100) NOT NULL,
    `event_data` JSON NULL,
    `timestamp` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user_id`(`user_id`),
    INDEX `session_id`(`session_id`),
    INDEX `event_type`(`event_type`),
    INDEX `timestamp`(`timestamp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Recreate classes table
CREATE TABLE `classes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `school_id` INTEGER NOT NULL,
    `class_name` VARCHAR(50) NOT NULL,
    `teacher_id` INTEGER NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `school_id`(`school_id`),
    INDEX `teacher_id`(`teacher_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Recreate students table
CREATE TABLE `students` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `alias` VARCHAR(100) NOT NULL,
    `class_id` INTEGER NOT NULL,
    `school_id` INTEGER NOT NULL,
    `teacher_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `students_user_id_key`(`user_id`),
    INDEX `user_id`(`user_id`),
    INDEX `class_id`(`class_id`),
    INDEX `school_id`(`school_id`),
    INDEX `teacher_id`(`teacher_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Recreate teacher_profiles table
CREATE TABLE `teacher_profiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `subject_id` INTEGER NULL,
    `school_id` INTEGER NULL,
    `name` VARCHAR(255) NULL,

    UNIQUE INDEX `teacher_profiles_user_id_key`(`user_id`),
    INDEX `user_id`(`user_id`),
    INDEX `subject_id`(`subject_id`),
    INDEX `school_id`(`school_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Update schools table if needed
ALTER TABLE `schools` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- Add foreign key constraints
ALTER TABLE `accounts` ADD CONSTRAINT `account_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `sessions` ADD CONSTRAINT `session_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `game_sessions` ADD CONSTRAINT `game_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `scores` ADD CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `leaderboards` ADD CONSTRAINT `leaderboards_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `progress` ADD CONSTRAINT `progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `user_badges` ADD CONSTRAINT `user_badges_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `user_badges` ADD CONSTRAINT `user_badges_ibfk_2` FOREIGN KEY (`badge_id`) REFERENCES `badges`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `analytics_events` ADD CONSTRAINT `analytics_events_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `analytics_events` ADD CONSTRAINT `analytics_events_ibfk_2` FOREIGN KEY (`session_id`) REFERENCES `game_sessions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `classes` ADD CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `schools`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `classes` ADD CONSTRAINT `classes_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `students` ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `students` ADD CONSTRAINT `students_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `students` ADD CONSTRAINT `students_ibfk_3` FOREIGN KEY (`school_id`) REFERENCES `schools`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `students` ADD CONSTRAINT `students_ibfk_4` FOREIGN KEY (`teacher_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `teacher_profiles` ADD CONSTRAINT `teacher_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `teacher_profiles` ADD CONSTRAINT `teacher_profiles_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `teacher_profiles` ADD CONSTRAINT `teacher_profiles_ibfk_3` FOREIGN KEY (`school_id`) REFERENCES `schools`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
