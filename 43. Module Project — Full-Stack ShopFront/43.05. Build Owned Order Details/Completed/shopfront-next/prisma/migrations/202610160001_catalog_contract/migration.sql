ALTER TABLE "Product" ADD COLUMN "category" TEXT NOT NULL DEFAULT 'Everyday';
ALTER TABLE "Product" ADD COLUMN "image" TEXT NOT NULL DEFAULT '/assets/mug.jpg';
UPDATE "Product" SET "category" = 'Workspace', "image" = '/assets/lamp.jpg' WHERE "id" = 'P-101';
UPDATE "Product" SET "category" = 'Travel', "image" = '/assets/backpack.jpg' WHERE "id" = 'P-102';
UPDATE "Product" SET "category" = 'Audio', "image" = '/assets/headphones.jpg' WHERE "id" = 'P-104';
