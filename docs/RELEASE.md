# Release Process (V2)

1. Ensure `main` is green (`verify` workflow passes).
2. Create a tag:
   ```bash
   git tag v2.0.0
   git push origin v2.0.0
   ```
3. GitHub Actions `release` workflow:
   - Builds service images
   - Pushes to ECR
4. Update image tags via kustomize:
   ```bash
   kubectl apply -k deploy/eks
   ```
