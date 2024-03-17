import { PoDynamicViewField } from "@po-ui/ng-components";

export const teamsFields: PoDynamicViewField[] = [
    {property: 'conference', label: 'Conferência', divider:'Conferência', gridColumns: 2, order: 1},
    {property: 'city', label: 'Cidade', gridColumns: 2},
    {property: 'division', label: 'Divisão de conferência', gridColumns: 2},
    {property: 'full_name', label: 'Nome Completo', divider:'Franquia', gridColumns: 2},
    {property: 'abbreviation', label: 'Nome Abreviado', gridColumns: 2},
]

export const playersFields: PoDynamicViewField[] = [
    {property: 'first_name', label: 'Nome', divider: 'Informações ', gridLgColumns: 2, order: 2},
    {property: 'last_name', label: 'Sobrenome', gridColumns: 2},
    {property: 'country', label: 'País de origem', gridLgColumns: 2},
    {property: 'position', label: 'Posição', gridColumns: 2, divider: 'Atributos'},
    {property: 'height', label: 'Altura', gridColumns: 2},
    {property: 'weight', label: 'Peso', gridColumns: 2},
    {property: 'jersey_number', label: 'Número', gridLgColumns: 2},
]