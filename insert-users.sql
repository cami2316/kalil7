INSERT INTO "User" (phone, name, password, role, "createdAt", "updatedAt") 
VALUES 
  ('407 2712279', 'Partner One', '$2b$10$k/.Kxe2sD985AJN5mnAcE.3rIDgNTy36SJl9ZLWfQbmGGQpbHw6gC', 'partner', NOW(), NOW()),
  ('3216821090', 'Partner Two', '$2b$10$k/.Kxe2sD985AJN5mnAcE.3rIDgNTy36SJl9ZLWfQbmGGQpbHw6gC', 'partner', NOW(), NOW()),
  ('321 4425003', 'Partner Three', '$2b$10$k/.Kxe2sD985AJN5mnAcE.3rIDgNTy36SJl9ZLWfQbmGGQpbHw6gC', 'partner', NOW(), NOW()),
  ('3212028584', 'Partner Four', '$2b$10$k/.Kxe2sD985AJN5mnAcE.3rIDgNTy36SJl9ZLWfQbmGGQpbHw6gC', 'partner', NOW(), NOW())
ON CONFLICT (phone) DO NOTHING;
