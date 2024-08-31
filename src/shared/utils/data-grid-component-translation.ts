import { GRID_DEFAULT_LOCALE_TEXT, GridLocaleText } from '@mui/x-data-grid-pro';

export const dataGridComponentTranslation: GridLocaleText = {
  ...GRID_DEFAULT_LOCALE_TEXT,

  noRowsLabel: 'Sem conteúdo',
  noResultsOverlayLabel: 'Sem conteúdo',

  toolbarDensity: 'Densidade',
  toolbarDensityLabel: 'Densidade',
  toolbarDensityCompact: 'Compacto',
  toolbarDensityStandard: 'Padrão',
  toolbarDensityComfortable: 'Confortável',

  toolbarColumns: 'Colunas',
  toolbarColumnsLabel: 'Selecionar colunas',

  toolbarFilters: 'Filtros',
  toolbarFiltersLabel: 'Mostrar filtros',
  toolbarFiltersTooltipHide: 'Esconder filtros',
  toolbarFiltersTooltipShow: 'Mostrar filtros',

  filterPanelAddFilter: 'Adicionar filtro',
  filterPanelDeleteIconLabel: 'Apagar',
  filterPanelOperatorAnd: 'E',
  filterPanelOperatorOr: 'Ou',
  filterPanelColumns: 'Colunas',
  filterPanelInputLabel: 'Valor',
  filterPanelInputPlaceholder: 'Valor para filtrar',

  filterOperatorContains: 'Contém',
  filterOperatorEquals: 'Igual',
  filterOperatorStartsWith: 'Começa com',
  filterOperatorEndsWith: 'Termina com',
  filterOperatorIs: 'é',
  filterOperatorNot: 'Não é',
  filterOperatorAfter: 'is after',
  filterOperatorOnOrAfter: 'is on or after',
  filterOperatorBefore: 'is before',
  filterOperatorOnOrBefore: 'is on or before',

  filterValueAny: 'Qualquer',
  filterValueTrue: 'Verdadeiro',
  filterValueFalse: 'Falso',

  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Mostrar ou esconder colunas',
  columnMenuFilter: 'Filtrar',
  columnMenuHideColumn: 'Esconder',
  columnMenuUnsort: 'Remove ordenação',
  columnMenuSortAsc: 'Ordenar por CRES',
  columnMenuSortDesc: 'Ordenar por DESC',

  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} filtros ativos` : `${count} filtro ativo`,
  columnHeaderFiltersLabel: 'Mostrar filtros',
  columnHeaderSortIconLabel: 'Ordenar',

  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} linhas selecionadas`
      : `${count.toLocaleString()} linha selecionada`,

  footerTotalRows: 'Total de colunas:',

  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,

  checkboxSelectionHeaderName: 'Selecionar',

  booleanCellTrueLabel: 'Verdadeiro',
  booleanCellFalseLabel: 'Falso',
  MuiTablePagination: {
    labelRowsPerPage: 'Linhas por página',
    labelDisplayedRows: ({ from, to, count }) =>
      `${from}-${to} de ${count !== -1 ? count : `${to} de`}`,
    nextIconButtonProps: {
      children: 'Próxima página',
    },
    backIconButtonProps: {
      children: 'Página anterior',
    },
  },
};
