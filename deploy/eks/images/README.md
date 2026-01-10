# Image Overrides

Use kustomize image overrides to pin service versions.

Example:
```yaml
images:
  - name: canonical-api
    newName: <account>.dkr.ecr.<region>.amazonaws.com/canonical-api
    newTag: v2.0.0
```
