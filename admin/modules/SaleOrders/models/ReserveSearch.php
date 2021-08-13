<?php

namespace admin\modules\SaleOrders\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use common\models\SaleHeader;
 

 
/**
 * SalehearderSearch represents the model behind the search form about `common\models\SaleHeader`.
 */
class ReserveSearch extends SaleHeader
{
    /**
     * @inheritdoc
     */
    public $business_type;
    public $customer_name;
    public $search;
    public $vat;
    public $fdate;
    public $tdate;
    public $Invoice;
    public function rules()
    {
        return [
            [['id', 'discount', 'user_id', 'comp_id','update_by'], 'integer'],
            //[['ext_document', 'balance'], 'string'],
            [['no', 'customer_id','ext_document','payment_term','vat_type','include_vat', 'business_type'], 'safe'],
            [['order_date', 'ship_date', 'create_date','update_date'], 'safe'],
            [['customer', 'customer_name','search', 'vat', 'fdate', 'tdate'], 'safe'],
            [['status','remark','transport','sale_id', 'Invoice'],'string'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = SaleHeader::find()
                ->joinWith(['customer'])
                ->leftJoin('rc_invoice_header','rc_invoice_header.order_id=sale_header.id')
                ->where(['sale_header.comp_id' => Yii::$app->session->get('Rules')['comp_id']]);
        
                 
        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort'=> ['defaultOrder' => ['order_date'=>SORT_DESC]],
            'pagination' => ['pageSize' => 20],
        ]);

        $dataProvider->sort->attributes['customer_name'] = [
            'asc' => ['customer.name' => SORT_ASC],
            'desc' => ['customer.name' => SORT_DESC],
        ];

        $dataProvider->sort->attributes['Invoice'] = [
            'asc' => ['rc_invoice_header.no_' => SORT_ASC],
            'desc' => ['rc_invoice_header.no_' => SORT_DESC],
        ];

        $this->load($params);

        if (!$this->validate()) {
            return $dataProvider;
        }

        //var_dump($this->status);
        

        $query->andFilterWhere([
            'customer.customer_id' => $this->customer_id,
            'customer.genbus_postinggroup' => $this->business_type
        ]);

        $query->andFilterWhere(['IN', 'sale_header.status', $this->status]);
 
        $query->andFilterWhere(['or',
                                ['like','customer.name', trim($this->search)],
                                ['like','customer.code', trim($this->search)],
                                ['like','sale_header.no', trim($this->search)],
                                ['like','rc_invoice_header.no_', trim($this->search)],
                                ['like','sale_header.ext_document', trim($this->search)]
                            ]);
                            
        $query->andFilterWhere([$this->vat > 0 ? '>' : '<=','sale_header.vat_percent',$this->vat]);

                
        //--- Date Filter ---
         
        $query->andFilterWhere(['between',
            'DATE(sale_header.order_date)', 
            ($this->fdate!='' ? date('Y-m-d 00:00:0000',strtotime($this->fdate)) : date('Y-').date('m-').'01  00:00:0000'), 
            ($this->tdate!='' ? date('Y-m-d 23:59:59.9999',strtotime($this->tdate)) : date('Y').'-12-31 23:59:59.9999')
        ]);
        //--- /. Date Filter ---

        return $dataProvider;
    }

  

}
