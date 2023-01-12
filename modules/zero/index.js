import CodeModule from './core'
import FiltersModule from './filters'
import PaginationModule from './pagination'

// ///////////////////////////////////////////////////////////////////// Liftoff
// -----------------------------------------------------------------------------
export default function () {
  CodeModule(this)
  FiltersModule(this)
  PaginationModule(this)
}
