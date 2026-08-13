import { describe, expect, it } from 'vitest'
import { moduleDefinitions } from '../config/moduleDefinitions'
import { workflowSteps } from '../config/galaxyConfig'
describe('E.X Galaxy prototype configuration', () => { it('contains eight data-driven modules with a single available showcase', () => { expect(moduleDefinitions).toHaveLength(8); expect(moduleDefinitions.filter(item => item.available).map(item => item.id)).toEqual(['video-studio']) }); it('contains the complete Auto Create concept workflow', () => { expect(workflowSteps).toHaveLength(13); expect(workflowSteps.at(-1)).toBe('Project ready') }) })
